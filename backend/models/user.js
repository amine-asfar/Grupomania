const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    firstName:{type:String, required: true},
    lastName:{type:String, required: true},
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, //unique (mongoose-unique-validator) deux utilisateurs ne puissent partager la même adresse e-mail.
    password: { type: String, required: true },
    
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);