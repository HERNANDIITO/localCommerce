const mongoose = require('mongoose');

const commerceSchema = new mongoose.Schema({
    name: String,
    desc: String,
    location: String,
    lat: Number,
    long: Number,
    owner: String,
    type: String,
    offer: String
});

const Commerce = mongoose.model('Commerce', commerceSchema);

module.exports = Commerce;