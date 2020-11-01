const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Stripe = require('stripe')
const { uuid } = require('uuidv4')
const jwt = require('jsonwebtoken')
const express = require('express')
const logger = require('../logging')


const router = express.Router()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
     logger.debug('CHECKOUT: Start of GET end point');

     const {paymentData } = req.body;
    try {
        // 1) Verify and get the user cart from the token
        const {userId} = jwt.verify(req.headers.authorization, 
            process.env.JWT_SECRET);
        // 2) Find cart based on user id, populate it
        const cart = await Cart.findOne({user: userId}).populate({
            path:"products.product",
            model: "Product"
        });
        // 3) Calculate cart totals again from cart products
        const {cartTotal, stripeTotal} = calculateCartTotal(cart.products);
        // 4) Get the email for payment data, see if email is linked with 
        const prevCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1
        });
        const isExistingCustomer = prevCustomer.data.lenght > 0;
        // existing stripe customer.
        // 5) if not existing customer, create them based on their email
        let newCustomer;
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            })
        }
        const customer = (isExistingCustomer && prevCustomer.data[0].id) ||
        newCustomer.id;
        // 6) create charge with total, send receipt email.
        const charge = await stripe.charges.create({
            currency:"usd",
            amount: stripeTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        }, {
            idempotency_key: uuid()
        })
        // 7) Add order data to db
        await new Order({
            user: userId,
            email: paymentData.email, 
            total: cartTotal,
            products: cart.products
        }).save();
        // 8) Clear products in cart
        await Cart.findOneAndUpdate(
            {_id: cart._id},
            {$set: {products: []}}
        )
        // 9) Send back success (200) response 
        res.status(200).send("Checkout successful");
    } catch (error) {
        logger.error(`CHECKOUT: Error occured ${error}`);
        res.status(500).send('Error processing charge');
    }
    logger.debug('CHECKOUT: End of GET end point');
})

function calculateCartTotal(products) {
    const total = products.reduce((acc, el) => {
        acc += el.product.price * el.quantity;
        return acc;
    }, 0);
    const cartTotal = ((total *100)/100).toFixed(2);
    const stripeTotal = Number((total*100).toFixed(2));
    return { cartTotal, stripeTotal};
}

module.exports = router;