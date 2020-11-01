const User = require('../models/User')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const logger = require('../logging')

router.get('/', async (req, res) => {
    logger.debug('USERS: Start of GET end point');
    try {
        const {userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const users = await User.find({_id: { $ne: userId }})
                                .sort({ role: 'asc' });
        res.status(200).json(users);
    } catch (error) {
        logger.error(`USERS: Error occured ${error}`);
        res.status(403).send("Please login again");
    } 
    logger.debug('USERS: End of PUT end point');

});

module.exports = router;