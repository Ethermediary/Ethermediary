const Q = require('q');
const fs = require("fs");
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

module.exports = {

    createBuyerBridge: function(dealData){
        var defer = Q.defer();
        let done = false;
        
        BuyerBridge.new(
            dealManagerAddress, 
            web3.toWei(dealData.amount, 'ether'),
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
                        defer.resolve(res.address);
                }
            });
        return defer.promise;
    },

    // retreiveId : function(transactionHash){  
    //     let event = contract.NewDeal ({},
    //         {fromBlock: blockNumber, toBlock: blockNumber});
    //     var blockNumber;
    
    //     return Q.nfcall(web3.eth.getTransactionReceipt, transactionHash)
    //     .then(function(result){
    //         blockNumber = result.blockNumber; 
    //         return Q.nfcall(event.get);
    //     })
    //     .then(function(){
    //         let filtered = res.filter (e => e.transactionHash == transactionHash);
    //         if(filtered.length == 0)
    //             throw new Error("no id found for transaction number:" + transactionHash);
    //         if(filtered.length > 1)
    //             console.log("WARNING: that weird, this transaction has several NewDeal events:" + transactionHash);
    //         return filtered[0].args.id.toNumber();
    //     });
    
    // }
};
const buyerBridgeCode = "0x6060604052341561000f57600080fd5b60405161035f38038061035f8339810160405280805191906020018051919060200180518201919060200180519190602001805190910190505b60008054600160a060020a031916600160a060020a0387161790556001849055600283805161007c9291602001906100b7565b5060038054600160a060020a031916600160a060020a03841617905560048180516100ab9291602001906100b7565b505b5050505050610157565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100f857805160ff1916838001178555610125565b82800160010185558215610125579182015b8281111561012557825182559160200191906001019061010a565b5b50610132929150610136565b5090565b61015491905b80821115610132576000815560010161013c565b5090565b90565b6101f9806101666000396000f30060606040525b5b60005460015460035473ffffffffffffffffffffffffffffffffffffffff928316926389ccbe1392349290916002911660046040517c010000000000000000000000000000000000000000000000000000000063ffffffff88160281526004810185815273ffffffffffffffffffffffffffffffffffffffff841660448301526080602483019081528554600260001961010060018416150201909116046084840181905291929091606482019160a40190879080156101075780601f106100dc57610100808354040283529160200191610107565b820191906000526020600020905b8154815290600101906020018083116100ea57829003601f168201915b505083810382528454600260001961010060018416150201909116048082526020909101908590801561017b5780601f106101505761010080835404028352916020019161017b565b820191906000526020600020905b81548152906001019060200180831161015e57829003601f168201915b505096505050505050506000604051808303818588803b151561019d57600080fd5b6125ee5a03f115156101ae57600080fd5b505050503373ffffffffffffffffffffffffffffffffffffffff16ff5b0000a165627a7a72305820f54af3d2f71741d9d0ab386f572ae20e11697db0da99bf59b341fdc6cded90730029";
const buyerBridgeApi = [
    {
      "inputs": [
        {
          "name": "dealManagerAddress",
          "type": "address"
        },
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
      "payable": false,
      "type": "constructor"
    },
    {
      "payable": true,
      "type": "fallback"
    }
  ];

var BuyerBridge = web3.eth.contract(buyerBridgeApi);
var dealManagerAddress = fs.readFileSync(path.join(__dirname, "public", "eth", "managerAddress")).toString();
  