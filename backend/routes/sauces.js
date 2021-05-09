const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require ('../controllers/sauces');


router.post('/',auth,  multer, saucesCtrl.createSauce ); //route pour envoyer une sauce a l'API
router.get('/:id', auth, saucesCtrl.getOneSauce ); //route pour selectionner une sauce
router.put('/:id', auth, saucesCtrl.modifySauce ); //route pour modifier une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce );//route pour supprimer une sauce
router.get('/', auth, saucesCtrl.getAllSauces );//route pour selectionner toutes les sauces

router.post('/:id/like', auth, saucesCtrl.getLikes);//route pour les likes/dislikes

module.exports = router;
