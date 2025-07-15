const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imagePaths: [String]  // Array of uploaded image paths
});

module.exports = mongoose.model('Package', packageSchema);
