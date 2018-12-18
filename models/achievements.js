var mongoose = require('mongoose');


var achievementSchema = new mongoose.Schema({
    title: String,
    image: String,
    added: { type: Date, default: Date.now },
    content: String
});

module.exports = mongoose.model("Achievement", achievementSchema);

