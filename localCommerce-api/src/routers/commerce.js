const express = require('express');
const Commerce = require('../models/commerce');
const router = new express.Router();

router.get('/api/getCommerces', async (req, res) => {
    try {
        const commerces = await Commerce.find();
        res.status(200).send(commerces);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;