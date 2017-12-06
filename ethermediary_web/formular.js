const express = require('express');
const router = new express.Router();
const path = require('path');
const Web3 = require("web3");
const ethermediary = require('./ethermediary.js');
ethermediary.setWeb3Provider(new Web3.providers.HttpProvider("http://192.168.1.23:8545"));
// ethermediary.retreiveDealId("0xc4af52cbd5c7f5c09fe1e571740eeaf0b19f441ac064c873e78b287fbc59b9c6")
// .then(console.log)
// .fail(console.log);

const monitor = require('./monitor.js')

module.exports = router;

// test global variable
/*
    monitor.json2add.nb_index_load += 1
    monitor.json2add.nb_new_deal += 1
    monitor.json2add.nb_deal_created += 1
    monitor.json2add.nb_get_deal += 1
    monitor.json2add.nb_how_it_works += 1
    monitor.json2add.nb_terms_of_use += 1
    monitor.json2add.nb_donation += 1
*/

function frozenTime(creation_time){
  var remaining_time = 42;
  return remaining_time;
};

// This is the page for myDeal
router.post("/myDeal", function(req, res){

    monitor.json2add.nb_new_deal += 1 // increment stat variable

    var dealInfo;
    if(!("dealData" in req.body)){
        res.status(400).send("you should provide the address in deal data");
        return;
    }

    req.sanitizeBody('deal_id').trim();
    req.checkBody("deal_id", "Please enter a valid deal ID").notEmpty();
    req.checkBody("deal_id", "Deal ID must be an integer").isInt();

    req.getValidationResult()
        .then(function (results) {
            console.log("got validation results");
            if (results.isEmpty()) {
                console.log("no errors");
                return;
            } else {
                // Verification of the deal's ID validity
                // Redirection to the right state windows
                console.log("validation errors", results.array());
                let errors = results.array();
                res.render('getDeal', {
                    req: req,
                    error_deal_id: errors.filter(e => e.param == "deal_id"),
                });
                throw new Error("validation errors");
            }
        })
        .then(function(){
            console.log("getting deal info")
            return ethermediary.getDealInfo(req.body.deal_id);
        })
        .then(function(info){
            console.log("deal found", info);
            dealInfo = info;
            dealInfo.remaining_time = frozenTime(transaction.creation_date);
            return ethermediary.getRole(req.body.deal_id, req.body.dealData);
        })
        .then(function(role){
            dealInfo.role = role;

            res.render('myDeal',{
                dealInfo: dealInfo
            });
        })
        .catch(function (err) {
            console.log("error", err);
            if(err.message.indexOf("deal") != -1){
                res.render('dealNotFound', {dealId: req.body.deal_id});
                return;
            }
            if(err.message == "validation errors"){
                return;
            }
            res.status(500).send("internal error sorry");
        });
});

var allowedPosts = ['simulation', 'terms', 'howitworks', 'needMeta', 'dealNotFound',
    'newDeal1Content', 'newDeal2Content', 'newDeal3Content',
    'getDeal', 'loading', 'newDealDone', 'index'];

router.post("/:page", function(req, res, next){
    if(allowedPosts.indexOf(req.params.page) == -1){
        return next();
        console.log("refused");
    }

    try{
        res.render(req.params.page);
    }catch(e){
        console.log(e);
        next();
    }
});
