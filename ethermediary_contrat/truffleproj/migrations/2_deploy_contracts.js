/*var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");*/
var DealManager = artifacts.require("./DealManager.sol");
var BuyerBridge = artifacts.require("./BuyerBridge.sol");
var SellerBridge = artifacts.require("./SellerBridge.sol");

module.exports = function(deployer) {
 /* deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);*/
  deployer.deploy(DealManager/*,{gas: 900000}*/)
  .then(function(){
    console.log("deal manager address:" + DealManager.address);
  })
  // deployer.deploy(BuyerBridge, 
  //   "0x65dfee531e7a678a377c80f41234c2e2a042cf59",
  //    100, "email", "0xBcf7e89caEc7C298Ec8418ae2FF45037FfAd1264", "sellermail")
  // .then(function(){
  //   console.log("buyer bridge address:" + BuyerBridge.address);
  // })

  // deployer.deploy(SellerBridge, "6307379262913404", true)
  // .then(function(){
  //   console.log("seller bridge address:" + SellerBridge.address);
  // });
};

/*
version web : 
voici une address de BuyerBridge, envoie tel somme a cette addresse pour demarrer le contrat
BuyerBridge transmet a DealManager, et se suicide

pendant ce temps notre node surveille DealManager et quand ya un nouveau deal il envoie un email

version metamask:
on créé la transaction client side directement
*/