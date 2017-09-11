const express = require('express');
const router = new express.Router();
const path = require('path');
const sizeof = require('object-sizeof');
module.exports = router;

var ongoingDeal = 0;

// Declare an object containing a new transaction
function createDeal(err){
  var newDeal = Object.create(null);
  console.log("A new deal has been declared");
  return newDeal;
}

function newIndex(err){ // On boucle dans 1024 variables deal en cours
  if (ongoingDeal == 1024) {ongoingDeal = 0;}
  var newIndex = ongoingDeal + 1;
  return newIndex;
} // Maximum memory usage is estimated between 512ko and 1mo in the worst case, which is really fine

function curIndex(err){ // Pour connaitre la position de l'index actuel
  temp = ongoingDeal+1;
  return temp;
}

router.post('/newdealtwo', function(req,res){
    req.sanitizeBody('meta').trim();
    req.sanitizeBody('amount').trim();

    var index = newIndex();
    global["newDeal" + curIndex()] = createDeal();

    req.checkBody("meta", "Please enter the transaction purpose").notEmpty();
    req.checkBody("amount", "Please enter a decimal number").isDecimal();

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                res.render(path.join(__dirname, 'views', 'newdealtwo.dust'),
                {index: index}); // L'index de la transaction en cours est passé via post à la page suivante
                global["newDeal" + curIndex()].meta = req.body.meta;
                global["newDeal" + curIndex()].amount = req.body.amount;
                ongoingDeal += 1;
            } else {
                let errors = results.array();
                res.render(path.join(__dirname, 'views', 'newdealone.dust'), {
                    req: req,
                    error_meta: errors.filter(e => e.param == "meta"),
                    error_amount: errors.filter(e => e.param == "amount")
                });
            }
        })
        .catch(function (err) {
            console.log("error while validating: " + err);
            res.status(500).send("error validating results");
        });
});

router.post('/newdealreview',function(req,res){
    req.sanitizeBody('buyer_address').trim();
    req.sanitizeBody('buyer_email').trim();
    req.sanitizeBody('seller_address').trim();
    req.sanitizeBody('seller_email').trim();
    req.sanitizeBody('refund_duration').trim();
    var index = req.body.index;

    // On extrait l'erreur correspondante de l'objet retourné par req.validationErrors()
    req.checkBody("buyer_address", "The address should be made of 42 caracters")
        .len(42);
    req.checkBody("buyer_address", "The address should be made of alphanumeric caracters")
        .isAlphanumeric();
    req.checkBody("buyer_email", "Please enter a valid email for the Buyer")
        .isEmail();
    req.checkBody("seller_address", "The address should be made of 42 caracters")
        .len(42);
    req.checkBody("seller_address", "The address should be made of alphanumeric caracters")
        .isAlphanumeric();
    req.checkBody("seller_email", "Please enter a valid email for the Seller")
        .isEmail();
    /*req.checkBody("refund_duration", "Please enter a valid integer for the number of days")
        .isInt({ min: 7, max: 365 });*/

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                res.render(path.join(__dirname, 'views', 'newdealreview.dust'), {
                  req: req, // Pour remplir le formulaire de review
                  index: index,
                  meta: global["newDeal" + index].meta,
                  amount: global["newDeal" + index].amount,
                  buyer_address: req.body.buyer_address,
                  buyer_email: req.body.buyer_email,
                  seller_address: req.body.seller_address,
                  seller_email: req.body.seller_email
                });
                // On stocke les infos validés dans l'objet newDeal*** avec le bon index
                global["newDeal" + index].buyer_address = req.body.buyer_address;
                global["newDeal" + index].buyer_email = req.body.buyer_email;
                global["newDeal" + index].seller_address = req.body.seller_address;
                global["newDeal" + index].seller_email = req.body.seller_email;
                console.log("Deal n°" + index + ":");
                console.log(global["newDeal" + index]);
                //console.log(sizeof(global["newDeal" + index]));
            } else {
                let errors = results.array();

                //ici errors contient donc la list d'objet décrite dans le paragraphe plus haut
                //on utilise Array.prototype.filter pour récuperer seulement les membres
                //qui ont comme valeur de "param" le nom de l'erreur qu'on veut
                res.render(path.join(__dirname, 'views', 'newdealtwo.dust'), {
                    req: req,
                    error_buyer_address: errors.filter(e => e.param == "buyer_address"),
                    error_buyer_email: errors.filter(e => e.param == "buyer_email"),
                    error_seller_address: errors.filter(e => e.param == "seller_address"),
                    error_seller_email: errors.filter(e => e.param == "seller_email"),
                    //error_refund_duration: errors.filter(e => e.param == "refund_duration")
                });
            }
        })
        .catch(function (err) {
            console.log("error while validating: " + err);
            res.status(500).send("error validating results");
        });
});

router.post('/newdealdone',function(req,res){
    // Insérer l'ID de transaction du Buyer renvoyé par le contrat ici
    var deal_id = req.body.deal_id;
    var index = req.body.index;
    res.render(path.join(__dirname, 'views', 'newdealdone.dust'));
    console.log("Voici les informations du deal:" + global["newDeal" + index]);
});

router.post('/mydeal',function(req,res){
    var deal_id = req.body.deal_id;
    res.render(path.join(__dirname, 'views', 'mydeal.dust'));
    console.log(newDeal);
});
