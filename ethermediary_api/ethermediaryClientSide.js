const dealManagerAddress = "0xc5cc65999ec38152f7bcb08573a0f434f1ac90b7";
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
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "getRole",
    "outputs": [
      {
        "name": "",
        "type": "string"
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
        createDealManager: function(){
          window.DealManager = web3.eth.contract(dealManagerAbi).at(dealManagerAddress);          
        },

        seller: function(fromAddress, encryptorUUID){
            if(!encryptorUUID)
                encryptorUUID = 1;
            return {
                answerOffer: function(cautionETH, id, answer){
                    return makePromise(
                        window.DealManager.SELLER_answerOffer,
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
                        window.DealManager.SELLER_askCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                acceptCancel: function(id){
                    return makePromise(
                        window.DealManager.SELLER_acceptCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                refuseCancel: function(id){
                    return makePromise(
                        window.DealManager.SELLER_refuseCancel,
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
                    return makePromise(window.DealManager.BUYER_createDeal, [
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
                },

                cancelOffer: function(id){
                  return makePromise(
                      window.DealManager.BUYER_cancelOffer, 
                      [id, encryptorUUID, {from: fromAddress}]);
                },

                receivedPackage: function(id){
                    return makePromise(
                        window.DealManager.BUYER_receivedPackage,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                askCancel: function(id){
                    return makePromise(
                        window.DealManager.BUYER_askCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                acceptCancel: function(id){
                    return makePromise(
                        window.DealManager.BUYER_acceptCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                },

                refuseCancel: function(refuseCancel){
                    return makePromise(
                        window.DealManager.BUYER_refuseCancel,
                        [id, encryptorUUID, {from: fromAddress}]);
                }
            };
        }
    }
})();