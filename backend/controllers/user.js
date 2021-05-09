const User = require('../models/User');  //on récupere le modele User
const bcrypt = require('bcrypt');       //module de cryptage de mot de passe
const jwt = require('jsonwebtoken');  //module pour l'authentificatiion



exports.signup = (req,res,next) =>{             //logique métier pour inscrire un utilisateur
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({         //on hash le mot de passe
                email: req.body.email,
                password: hash
            });
            user.save()             //on sauce le user dans la base de donnée
                .then(() =>res.status(201).json({message: 'user créé'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req,res,next) =>{              //logique métier pour se connecter
    User.findOne({email: req.body.email})
        .then(user => {                                 
            if(!user){
                return res.status(401).json({ error : 'User non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)    //on compare le mot de passé rentré avec celui e la base de donnée
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({error: 'mauvais password'});
                    }
                res.status(200).json({
                    userId:user._id,
                    token: jwt.sign(
                        { userId: user._id},            //token pour l'authentification
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn : '24h'}
                    )
                });
            }

            )
            .catch(error => res.status(500).json({error}))
    }

    )
    .catch(error => res.status(500).json({ error}));
};
