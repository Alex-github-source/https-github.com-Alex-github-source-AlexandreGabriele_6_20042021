const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require ('../controllers/sauces');


router.post('/',auth,  multer, saucesCtrl.createSauce );
router.get('/:id', auth, saucesCtrl.getOneSauce );
router.put('/:id', auth, saucesCtrl.modifySauce );
router.delete('/:id', auth, saucesCtrl.deleteSauce );
router.get('/', auth, saucesCtrl.getAllSauces );

router.post('/:id/like', auth, saucesCtrl.getLikes);

module.exports = router;
