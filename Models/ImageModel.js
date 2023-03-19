const mongoose = require('mongoose');

const imageSchema = new  mongoose.Schema({
    name : String,
    image: {
        data : Buffer,
        contentType : String
    }
})

const ImageModel = mongoose.model('image',imageSchema);

module.exports = ImageModel;