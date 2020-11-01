const Order = require('../models/Order')
const jwt = require('jsonwebtoken')
const express = require('express')
const logger = require('../logging')
const router = express.Router()

router.get('/', async (req, res) => {
    logger.debug('ORDERS: Start of GET end point');
    try {
        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const orders = await Order.find({user: userId})
                        .sort({ createdAt: 'desc' })
                        .populate( {
                            path: 'products.product',
                            model: 'Product'
                        });
        res.status(200).json(orders);
    } catch (error) {
        logger.error(`ORDERS: Error occured ${error}`);
        res.status(403).send("Please login again");
    }
    logger.debug('ORDERS: End of GET end point');
});

module.exports = router;