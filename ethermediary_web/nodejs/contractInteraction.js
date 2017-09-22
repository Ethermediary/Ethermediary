const Q = require('q');
const fs = require("fs");
const path = require('path');
const ZRX = require("0x.js");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// var zeroEx = new ZRX.ZeroEx(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// zeroEx.tokenRegistry.getTokenAddressesAsync()
// .then(console.log)
// .catch(console.log);


function onNewDeal(err, res){
  console.log("event!");
  if(err){
    console.log("error:" + err);
  }else{
    console.log("sending mail to "+ res.args.emailSeller + " from " + res.args.emailBuyer + " deal:" + res.args.id.toNumber());
  }
}

module.exports = {

  startWatchingContract: function(){
    let event = DealManager.NewDeal({});
    console.log("wathcing")
    event.watch(onNewDeal);
  },

  createBuyerBridge: function(dealData){
      var defer = Q.defer();
      let done = false;
      
      BuyerBridge.new(
          dealManagerAddress, 
          web3.toWei(dealData.amount, 'ether'),
          dealData.buyer_address,
          dealData.buyer_email,
          dealData.seller_address,
          dealData.seller_email,
          {
              from: web3.eth.coinbase, 
              gas: 3000000, 
              data: buyerBridgeCode
          },
          function(err, res){
              if(!done){
                  //the callback fires TWICE HAHAHAHAHA
                  //WHO BUILT THIS FUCKING API
                  //ONCE FOR THE TRANSACTION HASH AND ONCE FOR THE ACTUAL ADDRESS
                  //mother fucker
                  done = true;
                  if(err)
                      defer.reject(err);
              }else{
                  if(err)
                      defer.reject(err);
                  else
                      defer.resolve(res);
              }
          });
      return defer.promise;
  },

  retreiveIdFromHash : function(transactionHash){  
    let event = contract.NewDeal ({},
        {fromBlock: blockNumber, toBlock: blockNumber});
    var blockNumber;

    return Q.nfcall(web3.eth.getTransactionReceipt, transactionHash)
      .then(function(result){
          blockNumber = result.blockNumber; 
          return Q.nfcall(event.get);
      })
      .then(function(){
          let filtered = res.filter (e => e.transactionHash == transactionHash);
          if(filtered.length == 0)
              throw new Error("no id found for transaction number:" + transactionHash);
          if(filtered.length > 1)
              console.log("WARNING: that weird, this transaction has several NewDeal events:" + transactionHash);
          return filtered[0].args.id.toNumber();
      });
  }
};
const buyerBridgeCode = fs.readFileSync(path.join(__dirname, "public", "eth", "buyerBridgeCode")).toString();
const buyerBridgeAbiStr = fs.readFileSync(path.join(__dirname, "public", "eth", "buyerBridgeAbi")).toString();
eval("var buyerBridgeAbi=" + buyerBridgeAbiStr);
var BuyerBridge = web3.eth.contract(buyerBridgeAbi);

var dealManagerAddress = fs.readFileSync(path.join(__dirname, "public", "eth", "managerAddress")).toString();
var managerAbi = fs.readFileSync(path.join(__dirname, "public", "eth", "managerAbi")).toString();
eval("var DealManager = web3.eth.contract(" + managerAbi + ");");
DealManager = DealManager.at(dealManagerAddress);
