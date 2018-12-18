var mongoose = require('mongoose');


var mailSchema = new mongoose.Schema({
    email: String,
    subject: String,
    content: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mail", mailSchema);
