const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({            //creation du schema pour l'utilisateur
    email: { type: String, required:true, unique:true},
    password: { type: String, required:true}
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema); //on exporte le modele User