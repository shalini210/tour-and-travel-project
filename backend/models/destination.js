const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    imagePaths: [String]  // Array of uploaded image paths
});

module.exports = mongoose.model('Destination', destinationSchema);
