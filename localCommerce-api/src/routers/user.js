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

router.post('/api/login', async (req, res) => {
    let user = req.body.user;
    let pass = req.body.pass
    console.log(user, pass)
    try {
        const foundUser = await User.find({user: user, pass:pass})
        res.status(200).send(foundUser);
    } catch (error) {
        res.status(500).send(error);    
    }
});

module.exports = router;