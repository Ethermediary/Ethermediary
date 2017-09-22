const dealManagerAddress = "0xf7ba6726c76a7eb4a9a9540fc7575f841d83e746";
const dealManagerAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "generateEncryptorUUID",
    "outputs": [
      {
        "name": "res",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "muteContract",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "sellerCheated",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "myEmail",
        "type": "string"
      },
      {
        "name": "seller",
        "type": "address"
      },
      {
        "name": "sellerEmail",
        "type": "string"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_createDeal",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "reserveEncryptorUUID",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "answer",
        "type": "bool"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SELLER_answerOffer",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTax",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_receivedPackage",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SELLER_acceptCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_refuseCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getDealInfo",
    "outputs": [
      {
        "name": "dealId",
        "type": "uint256"
      },
      {
        "name": "buyer",
        "type": "address"
      },
      {
        "name": "emailBuyer",
        "type": "string"
      },
      {
        "name": "seller",
        "type": "address"
      },
      {
        "name": "emailSeller",
        "type": "string"
      },
      {
        "name": "offer",
        "type": "uint256"
      },
      {
        "name": "cautionSeller",
        "type": "uint256"
      },
      {
        "name": "cautionBuyer",
        "type": "uint256"
      },
      {
        "name": "state",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "dealExists",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SELLER_refuseCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "buyerCheated",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SELLER_askCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_askCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "muted",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_acceptCancel",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdrawTax",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BUYER_cancelOffer",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "emailBuyer",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "emailSeller",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "NewDeal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "answer",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "DealAnswered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SellerAskedCancel",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BuyerAskedCancel",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "SellerRefusedCancel",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "BuyerRefusedCancel",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "buyerEmail",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "sellerEmail",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "reason",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "encryptionAddress",
        "type": "uint256"
      }
    ],
    "name": "DealOver",
    "type": "event"
  }
];

window.addEventListener("load", function(){
    window.DealManager = web3.eth.contract(dealManagerAbi).at(dealManagerAddress);
})
var ethermediary = (function(){
    function makePromise(func, args){
        return new Promise(function(resolve, reject){
            func(...args, function(err, data){
                if(err)
                    return reject(err);
                resolve(data);
            });
        });
    }
    return {
        seller: function(fromAddress, encryptorUUID){
            if(!encryptorUUID)
                encryptorUUID = 1;
            return {
                answerOffer: function(cautionETH, id, answer){
                    return makePromise(
                        DealManager.SELLER_answerOffer,
                        [
                          id, answer, encryptorUUID, 
                          {
                            from: fromAddress,
                            value: web3.toWei(cautionETH, "ether")
                          }
                        ]);
                },

                askCancel: function(id){
                    return makePromise(
                        DealManager.SELLER_askCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                acceptCancel: function(id){
                    return makePromise(
                        DealManager.SELLER_acceptCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                refuseCancel: function(id){
                    return makePromise(
                        DealManager.SELLER_refuseCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },
                
            }
        },

        buyer: function(fromAddress, encryptorUUID){
            if(!encryptorUUID)
                encryptorUUID = 1;

            return {
                createDeal: function(amountETH, buyerMail, seller, sellerEmail){
                    //TODO encryption emails 
                    return makePromise(DealManager.BUYER_createDeal, [
                      web3.toWei(amountETH, "ether"),
                      buyerMail, 
                      seller,
                      sellerEmail,
                      encryptorUUID, 
                      {
                          value: web3.toWei(amountETH*1.1, "ether"), 
                          from: fromAddress
                      }
                    ]);
                    // return new Promise(function(resolve, reject){
                    //     DealManager.BUYER_createDeal(
                    //         web3.toWei(amountETH, "ether"),
                    //         buyerMail, 
                    //         seller,
                    //         sellerEmail,
                    //         encryptorUUID, 
                    //         {
                    //             value: web3.toWei(amountETH*1.1, "ether"), 
                    //             from: fromAddress
                    //         }, 
                    //         function(err, data){
                    //             if(err)
                    //                 throw err;
                    //             return resolve(data);
                    //         });
                    // });
                },

                cancelOffer: function(id){
                  return makePromise(
                      DealManager.BUYER_cancelOffer, 
                      [id, encryptorUUID, {from: fromAddress}]);
                    // return new Promise(function(resolve, reject){
                    //     DealManager.BUYER_cancelOffer(id, encryptorUUID, 
                    //         {from: this.fromAddress}, 
                    //         function(err, data){
                    //             if(err)
                    //                 return reject(err);
                    //             resolve(data);
                    //         });
                    // });
                },

                receivedPackage: function(id){
                    return makePromise(
                        DealManager.BUYER_receivedPackage,
                        [id, encryptorUUID, {from: fromAddress}]);
                    // return new Promise(function(resolve, reject){
                    //     DealManager.BUYER_receivedPackage(id, this.encryptorUUID,
                    //         {from: this.fromAddress},
                    //     function(err, data){
                    //         if(err)
                    //             return reject(err);
                    //         resolve(data);
                    //     });
                    // });
                },

                askCancel: function(id){
                    return makePromise(
                      DealManager.BUYER_askCancel,
                      [id, encryptorUUID, {from: fromAddress}]);

                    // return new Promise(function(resolve, reject){
                    //     DealManager.BUYER_askCancel(id, this.encryptorUUID, 
                    //         {from: this.fromAddress},
                    //     function(err, data){
                    //         if(err)
                    //             return reject(err);
                    //         resolve(data);
                    //     });
                    // });
                },

                acceptCancel: function(id){
                    return makePromise(
                      DealManager.BUYER_acceptCancel,
                      [id, encryptorUUID, {from: fromAddress}]);
                },

                refuseCancel: function(refuseCancel){
                    return makePromise(
                      DealManager.BUYER_refuseCancel,
                      [id, encryptorUUID, {from: fromAddress}]);
                }
            };
        }
    }
})();