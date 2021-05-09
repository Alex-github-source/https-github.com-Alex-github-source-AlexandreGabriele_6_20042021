const mongoose = require('mongoose');


const sauceSchema = mongoose.Schema({           //creation du schema pour la sauce
    userId: { 
        type:  String ,
        required : true
       
    },
    name: {
        type: String ,
        required : true,
        validate: {
            validator: function(v){
                return /[a-zA-Zéèëà]+[ -']?[a-zA-Zéèëà]+[minLength:3]/.test(v); //regex de validation pour les champs du formulaire (empeche les caracteres spéciaux)
            },
            message: props => `${props.value} is not a valid name !`
        } 
    },
    manufacturer: {
        type : String ,
        required : true,
        validate: {
            validator: function(v){
                return /[a-zA-Zéèëà]+[ -']?[a-zA-Zéèëà]+[minLength:3]/.test(v);
            },
            message: props => `${props.value} is not a valid manufacturer name !`
        } 
    },
    description: { 
        type : String ,
        required : true,
        validate: {
            validator: function(v){
                return /[a-zA-Zéèëà]+[ -']?[a-zA-Zéèëà]+[minLength:8]/.test(v);
            },
            message: props => `${props.value} is not a valid description !`
        } 
    } ,
    mainPepper: { 
        type : String , 
        required : true,
        validate: {
            validator: function(v){
                return /[a-zA-Zéèëà]+[ -']?[a-zA-Zéèëà]+[minLength:3]/.test(v);
            },
            message: props => `${props.value} is not a valid pepper name !`
        }  
    },
    imageUrl: { 
        type : String , 
        required : true 
    } ,
    heat: { 
        type : Number , 
        required : true 
    },
    likes: {
        type : Number , 
        required : true 
    },
    dislikes: {
        type : Number , 
        required : true 
    },
    usersLiked: {
        type : [] , 
        required : true 
    },
    usersDisliked: { 
        type : [] ,
        required : true 
    },

});



module.exports = mongoose.model('Sauce', sauceSchema);  //on exporte le modele Sauce