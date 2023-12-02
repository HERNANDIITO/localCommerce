const express = require('express');
const User = require('../models/user');
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

router.post('/api/updateCommerce', async (req, res) => {

    const newCommerce = {
        name:     req.body.name,
        desc:     req.body.desc,
        location: req.body.location,
        lat:      req.body.lat,
        long:     req.body.long,
        type:     req.body.type,
        owner:    req.body.owner,
    }

    if ( newCommerce.type == '' ) { newCommerce.type = 'default' };

    const alreadyAdded = await Commerce.exists({owner:newCommerce.owner});

    if ( alreadyAdded ) {
        Commerce.findOneAndUpdate({name: newCommerce.name}, newCommerce);
        res.status(200).send(addedCommerce);
    } else {
        res.status(200).send({error: "Usted todavía no tiene ningún comercio afiliado."});
    }
})

router.post('/api/addCommerce', async (req, res) => {

    console.log(req.body)
    
    const newCommerce = {
        name:     req.body.name,
        desc:     req.body.desc,
        location: req.body.location,
        lat:      req.body.lat,
        long:     req.body.long,
        type:     req.body.type,
        owner:    req.body.owner,
    }

    if ( newCommerce.type == '' ) { newCommerce.type = 'default' };

    const alreadyAdded = await Commerce.exists({name:newCommerce.name});

    if ( !alreadyAdded ) {
        const owner = await User.findOne({_id: newCommerce.owner});
        owner.overwrite({type: "com"})
        
        const addedCommerce = await Commerce.create(newCommerce);
        res.status(200).send(addedCommerce);
    } else {
        res.status(200).send({error: "Ya existe un comercio llamado: " + newCommerce.name});
    }
})

module.exports = router;