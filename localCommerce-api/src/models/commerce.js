const mongoose = require('mongoose');

const commerceSchema = new mongoose.Schema({
    name: String,
    desc: String
});

const Commerce = mongoose.model('Commerce', commerceSchema);

module.exports = Commerce;