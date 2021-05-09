const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const noCache = require('nocache');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

require('dotenv').config();  //utilisation du module "dotenv" pour créer un fichier environnement .env qui contient les informations de connexion


mongoose.connect(process.env.DB_URI,        //connexion au serveur mongoDB
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); //on appelle le framework "express"
app.use(helmet());  //module de protection : sécurisation requetes Http, headers, le détournement de clics et ajoute une protection XSS mineure ainsi que d'autres protections

app.use(noCache()); //module pour vider le cache
app.use(session({   //module pour proteger la session et les cookies
  secret: process.env.Session,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:3600000,
    httpOnly:true, 
    secure: true }
}));
app.use((req, res, next) => {     //Headers pour régler les problemes CORS
    res.setHeader('Access-Control-Allow-Origin', '*');//les ressources peuvent etre envoyées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// en tete de prévérification cross-origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//methodes autorisées pour les requetes

     next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/images', express.static(path.join(__dirname, 'images'))); //stockage des fichier photos dans le dossier images
app.use('/api/sauces',saucesRoutes); // appel des controllers sauces
app.use('/api/auth',userRoutes); //appel du controller user
module.exports = app;