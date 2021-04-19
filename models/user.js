const mongoose = require('mongoose')
let Schema = mongoose.Schema;
let brypt = require('bcryptjs')

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.encyptPassword = function(password) {
    return brypt.hashSync(password, brypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password) {
    return
}

module.exports = mongoose.model('User', userSchema);