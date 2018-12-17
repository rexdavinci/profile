var mongoose = require('mongoose');


var gallerySchema = new mongoose.Schema({
    title: String,
    caption: String,
    image: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gallery", gallerySchema);