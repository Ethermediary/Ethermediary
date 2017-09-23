var Web3 = require('web3');
var fs = require('fs');
var Q = require("q");
var web3;
var DealManager;

module.exports = {
    setWeb3Provider: function(provider){
        web3 = new Web3(provider);
        DealManager = web3.eth.contract(dealManagerAbi).at(dealManagerAddress);
    },

    getRole: function(id, fromAddress){
        return Q.nfcall(DealManager.getRole.call, id, fromAddress);
    },

    watchSellerAskerCancel: function(callback){
        DealManager.SellerAskedCancel(callback);
    },

    watchBuyerAskedCancel: function(callback){
        DealManager.BuyerAskedCancel(callback);
    },

    watchSellerRefusedCancel: function(callback){
        DealManager.SellerRefusedCancel(callback);
    },

    watchBuyerRefusedCancel: function(callback){
        DealManager.BuyerRefusedCancel(callback);
    },

    watchNewDeal: function(callback){
        DealManager.NewDeal().watch(callback);
    },

    watchDealAnswered: function(callback){
        DealManager.DealAnswered().watch(callback);
    },

    watchDealOver: function(callback){
        DealManager.DealOver().watch(callback);
    },

    generateApiUUID: function(){
        return new Promise(function(resolve, reject){
          var uuid = DealManager.generateEncryptorUUID.call();

          DealManager.reserveEncryptorUUID(uuid,{from: web3.personal.listAccounts[0], to: dealManagerAddress}, function(err, res){
              if(err)
                  return reject("uuid already taken or transaction failed:" + err);
              else
                  return resolve(uuid.toNumber());
          });
        });
    },

    getDealInfo: function(dealId){
        return Q.nfcall(DealManager.getDealInfo.call, dealId)
        .catch(function(err){
            throw new Error("dealId " + dealId + " not found");
        })
        .then(function(data){
          // uint dealId, address buyer, string emailBuyer, 
          // address seller, string emailSeller, uint offer, 
          // uint cautionSeller, uint cautionBuyer, State state
            return {
                dealId: data[0],
                buyer: data[1],
                emailBuyer: data[2],
                seller: data[3],
                emailSeller: data[4],
                offer: data[5],
                cautionSeller: data[6],
                cautionBuyer: data[7],
                state: data[8].toNumber()
            };
        });
    },

    retreiveDealId: function(transactionHash){
        return Q.nfcall(web3.eth.getTransactionReceipt, transactionHash)
        .then(function(transactionInfo){
            if(!transactionInfo)
                throw new Error('Transaction hash ' + transactionHash + " not found");
            return DealManager.NewDeal({}, 
            {
              fromBlock: transactionInfo.blockNumber, 
              toBlock: transactionInfo.blockNumber,
            });
        })
        .then(function(event){
          var defer = Q.defer();

          event.get(function(err, data){
              if(err){
                defer.reject(err);
                return;
              }  
              var res = data.filter(e => e.transactionHash == transactionHash);
              defer.resolve(res[0].args.id.toNumber());
          })

          return defer.promise;
        });
    },

    dealManagerAbi: "",
    dealManagerAddress: ""

};

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

  module.exports.dealManagerAbi = dealManagerAbi;
  module.exports.dealManagerAddress = dealManagerAddress;