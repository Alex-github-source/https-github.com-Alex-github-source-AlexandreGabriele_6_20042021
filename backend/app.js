const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const noCache = require('nocache');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

require('dotenv').config();


mongoose.connect(process.env.DB_URI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());

app.use(noCache());
app.use(session({
  secret: process.env.Session,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:3600000,
    httpOnly:true, 
    secure: true }
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

     next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces',saucesRoutes);
app.use('/api/auth',userRoutes);
module.exports = app;