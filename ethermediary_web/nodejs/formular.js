const express = require('express');
const router = new express.Router();
const path = require('path');

module.exports = router;

function frozenTime(creation_time){
  var remaining_time = 42;
  return remaining_time;
};

function getInfo(transaction){
  transaction.isBuyer = "1";
  transaction.isSeller = "0";
  transaction.state = "2";
  transaction.meta = "A tourte"; transaction.amount = "666";
  transaction.buyer_email = "buyer@gmx.com";
  transaction.seller_email = "seller@gmx.com";
  transaction.buyer_address = "petaouchnok";
  transaction.seller_address = "ouzbekistany";
  transaction.creation_date = "010117";
  // return 0 if transaction do not exist
  // return 1 if transaction exist
  transaction.exist = 1;
  return 0;
};

// Second newDeal page, serious sh*t right here
router.post('/newDeal2Content', function(req, res){
    req.sanitizeBody('meta').trim();
    req.sanitizeBody('amount').trim();

    req.checkBody("meta", "Please enter the transaction purpose").notEmpty();
    req.checkBody("amount", "Please enter a decimal number").isDecimal();

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                let toSave = {
                    meta: req.body.meta,
                    amount: req.body.amount
                };
                res.render('newDeal2Content',{
                    jsonData: JSON.stringify(toSave)
                });
            } else {
                let errors = results.array();
                res.render('newDeal1Content', {
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

// Review page before validating
router.post('/newDeal3Content',function(req,res){
    let dealData = JSON.parse(req.body.dealData);

    req.sanitizeBody('buyer_address').trim();
    req.sanitizeBody('buyer_email').trim();
    req.sanitizeBody('seller_address').trim();
    req.sanitizeBody('seller_email').trim();
    req.sanitizeBody('refund_duration').trim();

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

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty()) {
                dealData.buyer_address = req.body.buyer_address;
                dealData.buyer_email = req.body.buyer_email;
                dealData.seller_address = req.body.seller_address;
                dealData.seller_email = req.body.seller_email;

                res.render('newDeal3Content', {
                  req: req,
                  dealData: dealData,
                  jsonData: JSON.stringify(dealData)
                });
            } else {
                let errors = results.array();
                //ici errors contient donc la list d'objet décrite dans le paragraphe plus haut
                //on utilise Array.prototype.filter pour récuperer seulement les membres
                //qui ont comme valeur de "param" le nom de l'erreur qu'on veut
                res.render('newDeal2Content', {
                    req: req,
                    error_buyer_address: errors.filter(e => e.param == "buyer_address"),
                    error_buyer_email: errors.filter(e => e.param == "buyer_email"),
                    error_seller_address: errors.filter(e => e.param == "seller_address"),
                    error_seller_email: errors.filter(e => e.param == "seller_email"),
                    jsonData: req.body.dealData
                });
            }
        })
        .catch(function (err) {
            console.log("error while validating: ");
            console.log(err);
            res.status(500).send("error validating results");
        });
});

// This is the page for the classic unsecure sh*tty transaction
router.post('/newDealDone',function(req,res){
    if(!("dealData" in req.body)){
        res.status(400).send("you should provide the deal data");
        return;
    }
    let dealData = JSON.parse(req.body.dealData);

    contractInteraction.createBuyerBridge(dealData)
        .then(function(transact){
            res.render("newDealDone_web", {
                amount: parseInt(dealData.amount)*1.1,
                transact: transact
            })
        })
        .fail(function(err){
            console.log(err);
            res.status(500).send("error sorry");
        });
});

// This is the page for metamask
router.post("/dealCreated", function(req, res){
    if(!("transactionHash" in req.body)){
        res.status(400).send("you should provide the transactionHash");
        return;
    }
    res.render("newDealDone_metamask", {
        transactionHash: req.body.transactionHash
    });
});

router.post('/getDeal', function(req, res){
  res.render('getDeal');
});

// This is the page for myDeal
router.post("/myDeal", function(req, res){
    req.sanitizeBody('deal_id').trim();

    req.checkBody("deal_id", "Please enter a valid deal ID").notEmpty();
    //req.checkBody("deal_id", "Your user ID should be at least 42 caracters").len(42);
    // Because it's boring to dev with it

    /*var transaction = {isBuyer, isSeller, state, meta,
    amount, buyer_email, seller_email,
    creation_date, exist};*/
    //Call la fonction qui récupère les infos sur le contrat
    //Return 0 or 1 and get informations about it
    var transaction = {};
    getInfo(transaction);

    remaining_time = frozenTime(transaction.creation_date);
    //calculate remaining time before freezing

    req.getValidationResult()
        .then(function (results) {
            if (results.isEmpty() && (transaction.exist == 1)) {
                let toSave = {
                    deal_id: req.body.deal_id,
                };

                res.render('myDeal',{
                  jsonData: JSON.stringify(toSave),
                  isBuyer: transaction.isBuyer,
                  isSeller: transaction.isSeller,
                  state: transaction.state,
                  meta: transaction.meta,
                  amount: transaction.amount,
                  buyer_email: transaction.buyer_email,
                  seller_email: transaction.seller_email,
                  buyer_address: transaction.buyer_address,
                  seller_address: transaction.seller_address,
                  remaining_time: remaining_time
                });
            } else {
                // Verification of the deal's ID validity
                // Redirection to the right state windows

                let errors = results.array();
                res.render('getDeal', {
                    req: req,
                    error_deal_id: errors.filter(e => e.param == "deal_id"),
                });
            }
        })
        .catch(function (err) {
            console.log("error while validating: " + err);
            res.status(500).send("error validating results");
        });
});

var allowedPosts = ['simulation', 'terms', 'howitworks', 'newDeal1Content'];
router.post("/:page", function(req, res, next){
    if(allowedPosts.indexOf(req.params.page) == -1){
        return next();
        console.log("refused");
    }

    try{
        res.render(req.params.page);
    }catch(e){
        next();
    }
});
