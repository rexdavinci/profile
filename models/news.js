var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    source: String,
    category: String
});

module.exports = mongoose.model("News", newsSchema);