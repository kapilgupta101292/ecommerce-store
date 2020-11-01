const User = require('../models/User')
const jwt = require('jsonwebtoken')
const express = require('express')
const logger = require('../logging')
const router = express.Router()

router.get('/', async (req, res) => {
    logger.debug('ACCOUNT: Start of GET end point');
    if (!("authorization" in req.headers)) {
        logger.error('ACCOUNT: No Authorization token');
        return res.status(401).send("No authorization token");
    }
    try {
        const {userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const user = await User.findOne({_id: userId});
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
        
    } catch (error) {
        logger.error(`ACCOUNT: Error occured ${error}`);
        res.status(403).send("Invalid token");
    }
    logger.debug('ACCOUNT: End of GET end point');
});

router.put('/', async (req, res) => {
    logger.debug('ACCOUNT: Start of PUT end point');
    try {
        const {_id, role} = req.body;
        await User.findOneAndUpdate({_id}, {role});
        res.status(203).send('User updated successfully');
    } catch (error) {
        logger.error(`ACCOUNT: Error occured ${error}`);
        res.status(403).send("Invalid token");
    }
    logger.debug('ACCOUNT: End of PUT end point');
});

module.exports = router;