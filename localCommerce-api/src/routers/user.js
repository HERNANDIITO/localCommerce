const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/api/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/api/getUserByID', async (req, res) => {
    const userID = req.body.id;

    try {
        const foundUser = await User.find(ObjectId(userID), {user: 0, pass: 0});
        res.status(200).send(foundUser);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/api/login', async (req, res) => {
    
    const user = req.body.user;
    const pass = req.body.pass;

    try {
        const foundUser = await User.findOne({user: user, pass:pass}, {user: 0, pass: 0})
        res.status(200).send(foundUser);
    } catch (error) {
        res.status(500).send(error);    
    }
});

module.exports = router;