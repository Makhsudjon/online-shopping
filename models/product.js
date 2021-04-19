const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let schema = new Schema({
    imagePath: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
});

module.exports = mongoose.model('Product', schema)