const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/user');
const {body,validationResult} = require('express-validator');

const sanitize = (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error})  // code 400: bad request
    }
    next();      // si on ne trouve pas d'erreur par rapport à ce qu'on a demandé, on passe à la suite.
};

router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({min:6})
    ],sanitize, userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;