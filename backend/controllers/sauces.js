const Sauce = require('../models/Sauce');     //on appelle le modele " Sauce"
const fs = require('fs');


exports.createSauce =  (req, res, next) => {                  //logique métier pour la création d'une sauce
 
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //on delete l'id car mongoDB nous en donne une d'office
    const sauce = new Sauce ({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //on crée la sauce en elle meme
      likes:0,
      dislikes:0,
      usersLiked:[],
      usersDisliked:[]
    });
    sauce.save()
     .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) //on sauvegarde la sauce créée
      .catch(error => res.status(400).json({ error })); 
   
 } ;
exports.getOneSauce = (req, res, next) => {     //logique métier pour récupérer une sauce
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
exports.modifySauce = (req, res, next) => {   //logique metier pour modifier une sauce
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on récupere la sauce

    } : {...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })   //on update la sauce dans la base de donnée
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };
exports.deleteSauce = (req, res, next) => { //logique métier pour supprimer une sauce
  Sauce.findOne({_id: req.params.id})
  .then(sauce =>{                                         // on récupere la sauce a supp
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`,() =>{
    Sauce.deleteOne({ _id: req.params.id })       //on supprime la sauce
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};
exports.getAllSauces = (req,res,next) =>{           //logique métier pour récupérer toutes les sauces
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

exports.getLikes = (req, res, next) => {        //logique métier pour les likes/dislikes
 
  
  let like = req.body.like
  
  let userId = req.body.userId
  
  let sauceId = req.params.id

  if (like === 1) { // Si il s'agit d'un like
    Sauce.updateOne({
        _id: sauceId
      }, {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        }, 
      })
      .then(() => res.status(200).json({
        message: 'Like ajouté !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === -1) {
    Sauce.updateOne( // S'il s'agit d'un dislike
        {
          _id: sauceId
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          }, 
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Dislike ajouté !'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'Like retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'Dislike retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}