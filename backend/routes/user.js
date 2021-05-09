const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/user');
const {body,validationResult} = require('express-validator');

const sanitize = (req, res, next) => {            //on desinfecte les champs du formulaire

    const error = validationResult(req);
    if(!error.isEmpty()) {                  
        return res.status(400).json({error})  
    }
    next();     
};

router.post('/signup', [                //route pour enregistrer l'user dans l'API
    body('email').isEmail(),
    body('password').isLength({min:6})
    ],sanitize, userCtrl.signup);

router.post('/login', userCtrl.login);  //route pour la connexion d'un user

module.exports = router;