const dealManagerAddress = "0xdb57de63d557743a3ec00faefbaf4ffb5e9d3fb3";
const dealManagerAbi = [
  {
    constant: true,
    inputs: [],
    name: "generateEncryptorUUID",
    outputs: [
      {
        name: "res",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "muteContract",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "sellerCheated",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "myEmail",
        type: "string",
      },
      {
        name: "seller",
        type: "address",
      },
      {
        name: "sellerEmail",
        type: "string",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_createDeal",
    outputs: [],
    payable: true,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
    ],
    name: "reserveEncryptorUUID",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "answer",
        type: "bool",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SELLER_answerOffer",
    outputs: [],
    payable: true,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTax",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_receivedPackage",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SELLER_acceptCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_refuseCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
    ],
    name: "getDealInfo",
    outputs: [
      {
        name: "dealId",
        type: "uint256",
      },
      {
        name: "buyer",
        type: "address",
      },
      {
        name: "emailBuyer",
        type: "string",
      },
      {
        name: "seller",
        type: "address",
      },
      {
        name: "emailSeller",
        type: "string",
      },
      {
        name: "offer",
        type: "uint256",
      },
      {
        name: "cautionSeller",
        type: "uint256",
      },
      {
        name: "cautionBuyer",
        type: "uint256",
      },
      {
        name: "state",
        type: "uint8",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
    ],
    name: "dealExists",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "sender",
        type: "address",
      },
    ],
    name: "getRole",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SELLER_refuseCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "buyerCheated",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SELLER_askCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_askCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "muted",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_acceptCancel",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "withdrawTax",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BUYER_cancelOffer",
    outputs: [],
    payable: false,
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        name: "emailBuyer",
        type: "string",
      },
      {
        indexed: false,
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        name: "emailSeller",
        type: "string",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "NewDeal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "answer",
        type: "bool",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "DealAnswered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SellerAskedCancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BuyerAskedCancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "SellerRefusedCancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "BuyerRefusedCancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "buyerEmail",
        type: "string",
      },
      {
        indexed: false,
        name: "sellerEmail",
        type: "string",
      },
      {
        indexed: false,
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        name: "encryptionAddress",
        type: "uint256",
      },
    ],
    name: "DealOver",
    type: "event",
  },
];

var ethermediary = (function () {
  function makePromise(func, args) {
    return new Promise(function (resolve, reject) {
      func(...args, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
  return {
    /*
            create the representation of the DealManager contract, should be called before
            any other function
        */
    createDealManager: function () {
      window.DealManager = web3.eth
        .contract(dealManagerAbi)
        .at(dealManagerAddress);
    },

    /*
            create a "seller" object, used to access the seller related methods
            you have to provide an address that is the sending address of the transaction
            and an encryptor uuid.
            the encryptor uuid default as 1 which is handled by our personnal server.
        */
    seller: function (fromAddress, encryptorUUID) {
      if (!fromAddress)
        throw new Error(
          "you have to provide an address, you can just use web3.eth.accounts[0]"
        );
      if (!encryptorUUID) encryptorUUID = 1;
      return {
        /*
                    answer an offer with a boolean, you also have to provide the mount to
                    send as a caution. It should be the price of the sent object*0.1
                */
        answerOffer: function (cautionETH, id, answer) {
          return makePromise(window.DealManager.SELLER_answerOffer, [
            id,
            answer,
            encryptorUUID,
            {
              from: fromAddress,
              value: web3.toWei(cautionETH, "ether"),
            },
          ]);
        },
        /*
                    ask the buyer for a mutual cancel
                */
        askCancel: function (id) {
          return makePromise(window.DealManager.SELLER_askCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    accept a mutual cancel from the buyer
                */
        acceptCancel: function (id) {
          return makePromise(window.DealManager.SELLER_acceptCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    refuse a mutual cancel from the buyer
                */
        refuseCancel: function (id) {
          return makePromise(window.DealManager.SELLER_refuseCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
      };
    },

    /*
            create a buyer object, you should provide the sending address and an encryptor uuid
            the encryptor uuid default as 1 which is handled by our personnal server.
        */
    buyer: function (fromAddress, encryptorUUID) {
      if (!encryptorUUID) encryptorUUID = 1;

      return {
        /*
                    create a deal based on the given parameters. the amount given MUST be
                    in base unit (eg ETHER for ETH, not WEI)
                    The actual amount the user will have to send is amountETH*1.1
                */
        createDeal: function (amountETH, buyerMail, seller, sellerEmail) {
          //TODO encryption emails
          return makePromise(window.DealManager.BUYER_createDeal, [
            web3.toWei(amountETH, "ether"),
            buyerMail,
            seller,
            sellerEmail,
            encryptorUUID,
            {
              value: web3.toWei(amountETH * 1.1, "ether"),
              from: fromAddress,
            },
          ]);
        },
        /*
                    cancel an offer previously made, resulting on the deal ID being deleted
                */
        cancelOffer: function (id) {
          return makePromise(window.DealManager.BUYER_cancelOffer, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    tell the contract the buyer received the package/service, ending the deal
                */
        receivedPackage: function (id) {
          return makePromise(window.DealManager.BUYER_receivedPackage, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    ask the seller for a mutual cancel
                */
        askCancel: function (id) {
          return makePromise(window.DealManager.BUYER_askCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    accept a mutual cancel proposed by the seller
                */
        acceptCancel: function (id) {
          return makePromise(window.DealManager.BUYER_acceptCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
        /*
                    refuse a mutual cancel proposed by the seller
                */
        refuseCancel: function (refuseCancel) {
          return makePromise(window.DealManager.BUYER_refuseCancel, [
            id,
            encryptorUUID,
            { from: fromAddress },
          ]);
        },
      };
    },
  };
})();

try {
  module.exports = ethermediary;
} catch (e) {}
