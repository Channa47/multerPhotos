const mongoose = require('mongoose');

const imageUrlSchema = mongoose.Schema({
    image: String
})

const ImageUrlModel = mongoose.model('imageurl',imageUrlSchema);

module.exports = ImageUrlModel;