const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    pass: String,
    type: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;