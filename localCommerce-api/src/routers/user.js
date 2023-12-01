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
        const foundUser = await User.findOne({user: user, pass:pass}, {pass: 0})
        res.status(200).send(foundUser);
    } catch (error) {
        res.status(500).send(error);    
    }
});

router.post('/api/register', async (req, res) => {

    const user = req.body.user;
    const pass = req.body.pass;
    const name = req.body.name;

    const data = await User.exists({user:user});

    if ( !data ) {
        const newUser = await User.create({user: user, pass:pass, type:"usu", name: name});
        res.status(200).send(newUser);
    } else {
        res.status(200).send({error: "Ya existe un usuario llamado: " + user});
    }
});

module.exports = router;