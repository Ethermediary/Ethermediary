var contractAddress = "0x65dfee531e7a678a377c80f41234c2e2a042cf59";

var abi = [
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
        }
      ],
      "name": "BUYER_askCancel",
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
          "name": "id",
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
      "constant": false,
      "inputs": [
        {
          "name": "id",
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
        }
      ],
      "name": "BUYER_cancelOffer",
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
          "name": "answer",
          "type": "bool"
        }
      ],
      "name": "SELLER_answerOffer",
      "outputs": [],
      "payable": true,
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
      "name": "BUYER_receivedPackage",
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
        }
      ],
      "name": "SELLER_askCancel",
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
        }
      ],
      "name": "BUYER_acceptCancel",
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
          "name": "",
          "type": "string"
        }
      ],
      "name": "log",
      "type": "event"
    }
  ];


var contract;

window.addEventListener('load', function() {    
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    console.log("metamask found");
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Now you can start your app & access web3 freely:
  startApp()
});

function startApp(){

    if(!window.web3.isConnected()){
        console.log("couldn't connect to eth node");
        return;
    }
    contract = window.web3.eth.contract(abi).at(contractAddress);
    let event = contract.NewDeal({});
    event.watch(function(err, res){
      console.log("event!");
      if(err){
        console.log("error:" + err);
      }else{
        console.log(res);
      }
    });

    window.web3.eth.getBalance(contractAddress, function(err, res){
      if(err){
        console.log("error:" + err);
      }else{
        console.log("balance:" + res.toNumber());
      }
    })
    
    document.getElementById("doit").onclick = () =>{
        butClick(
            parseInt(document.getElementById("amount").value), 
            document.getElementById("email").value,
            document.getElementById("seller").value,
            document.getElementById("sellerEmail").value);
    }
}

function butClick(amount, email, seller, emailSeller){
    console.log(amount);
    console.log(email);
    console.log(seller);
    console.log(emailSeller);
    // let data = contract.BUYER_createDeal.getData(100, "ddd", 
    // "0x797624f070601F94Ae03015c5D4646FE2051D0c6", "emailSeller", 
    // {value: 110, from:window.web3.eth.accounts[0], gasPrice: 100});
    // //estimateGas(data);

    let tr = contract.BUYER_createDeal(100, "ddd", 
    "0x797624f070601F94Ae03015c5D4646FE2051D0c6", "emailSeller", 
    {value: 1000000000000000000, from:window.web3.eth.accounts[0], gas:300000},
      function(err, res){
        if(err){
          console.log("error:" + err);
        }else{
          console.log("transactio nresult")
          console.log(res);

          //you have to wait for the block to be mined to get the receipt
          
        }
      });
    //4712388   
}

function estimateGas(objData){
  let v = window.web3.eth.estimateGas({data: objData}, function(err, res){
    console.log("estimated gas:" + res);
  });
}