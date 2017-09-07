const express = require('express');
const router = new express.Router();
const path = require('path');
module.exports = router;

router.post('/newdealtwo',function(req,res){
    req.sanitizeBody('meta').trim();
    req.sanitizeBody('amount').trim();

    req.checkBody("meta", "Please enter the transaction purpose").isAlphanumeric();
    req.checkBody("amount", "Please enter a decimal number").isDecimal();

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                res.render(path.join(__dirname, 'views', 'newdealtwo.dust'));
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

router.post('/newdealdone',function(req,res){
    req.sanitizeBody('buyer_address').trim();
    req.sanitizeBody('buyer_email').trim();
    req.sanitizeBody('seller_address').trim();
    req.sanitizeBody('seller_email').trim();
    req.sanitizeBody('refund_duration').trim();

    // On extrait l'erreur correspondante de l'objet retourné par req.validationErrors()
    req.checkBody("buyer_address", "Please enter a valid public address for the Buyer")
        .len(42);
    req.checkBody("buyer_address", "this is a second error")
        .len(42);
    req.checkBody("buyer_email", "Please enter a valid email for the Buyer")
        .isEmail();
    req.checkBody("seller_address", "Please enter a valid public address for the Seller")
        .len(42);
    req.checkBody("seller_email", "Please enter a valid email for the Seller")
        .isEmail();
    req.checkBody("refund_duration", "Please enter a valid integer for the number of days")
        .isInt({ min: 7, max: 365 });


    //on utilise getValidationResult car req.validationErrors() est deprecated (il va etre retiré du module dans le futur)
    //getValidationResult nous donne un objets qui contient plusieurs fonction
    //ici on utilise isEmpty() pour check si ya des erreurs 
    //et array() qui nous donne la meme list d'objet que si on appelait directement req.validationErrors()
    //chaque element de l'array est un object avec les membres suivants: location, param, msg
    //voila un exemple pour l'erreur sur buyer_address:
    //{
    //    location: "body",
    //    param: "buyer_body",
    //    msg: "Please enter a valid public address for the Buyer"
    //}
    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                res.render(path.join(__dirname, 'views', 'newdealdone.dust'));
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
                    error_refund_duration: errors.filter(e => e.param == "refund_duration")
                });
            }
        })
        .catch(function (err) {
            console.log("error while validating: " + err);
            res.status(500).send("error validating results");
        });
});

router.post('/mydeal',function(req,res){
    var deal_id = req.body.deal_id;
    res.render(path.join(__dirname, 'views', 'mydeal.dust'));
});

