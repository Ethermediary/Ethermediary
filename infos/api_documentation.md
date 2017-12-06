The api is divided in 2 parts: 
 - A server side part meant to be used with nodejs allowing for non user specific actions, such as watching events or getting deal infos
 - A client side part meant to be used with metamask allowing for all the action a user can do, such as creating a deal, asking for cancels etc.

The client side version should be usable in a nodejs server as well if you run a local ethereum node.

Server side:
All the methods except for the event watching ones return a promise.

Here is a basic example of getting a deal's info: 

`
var Web3 = require("web3");
var ethermediary = require("./ethermediary.js");

ethermediary.setWeb3Provider(new Web3.providers.HttpProvider("http://localhost:8545"));
ethermediary.getDealInfo(1355433);
.then(function(info){
    console.log("deal number " + info.dealId + " was started by " + info.buyer);
})
.catch(function(err){
    console.log("error getting deal info:", err);
});
`

Please note that the dealId argument can't be a BigNumber
Here is an exemple of event watching: 

`
var Web3 = require("web3");
var ethermediary = require("./ethermediary.js");

ethermediary.setWeb3Provider(new Web3.providers.HttpProvider("http://localhost:8545"));
ethermediary.watchNewDeal(function(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("new deal:", data);
    }
});
`

API reference: 
setWeb3Provider(provider)
getRole(id, fromAddress)
watchSellerAskedCancel(callback)
watchBuyerAskedCancel(callback)
watchSellerRefusedCancel(callback)
watchBuyerRefusedCancel(callback)
watchNewDeal(callback)
watchDealAnswered(callback)
watchDealOver(callback)
generateApiUUID()
getDealInfo(dealId)
retreiveDealId(transactionHash)
dealManagerAbi
dealManagerAddress

setWeb3Provider(provider)
provider: a web3 (or ethjs or other) provider
set the web3 provider, first function you should call before calling any other otherwise nothing will work

getRole(id, fromAddress)
id: dealId as an int or string
fromAddress: public address to know the role of 
returns the role of the given address on the given deal can return "null", "buyer" or "seller"

watchSellerAskedCancel(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "SellerAskedCancel" event on the contract 

watchBuyerAskedCancel(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "BuyerAskedCancel" event on the contract 

watchSellerRefusedCancel(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "SellerRefusedCancel" event on the contract 

watchBuyerRefusedCancel(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "BuyerRefusedCancel" event on the contract 

watchNewDeal(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "NewDeal" event on the contract 

watchDealAnswered(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "DealAnswered" event on the contract

watchDealOver(callback)
callback: callback taking 2 arguments: and error (if any) and the event data. Will be called when the event if triggered on the blockchain
Watch for the "DealOver" event on the contract  

generateApiUUID()
generates an unique ID an reserve it in the contract, this ID can be passed to the contract's functions and will be retreived in the events as an argument. That way you can encrypt the email addresses an know which emails have been encrypted by you.

getDealInfo(dealId)
dealId: id of the deal as a string or int 
returns an object with all the info available about the deal

retreiveDealId(transactionHash)
transactionHash: hash of the transaction that created the deal
when the user creates a new deal he can't get the deal ID straight away because it is given in the "NewDeal" event. If ever your event handling server is down at the moment of the event firing, we provide the user with the hash of the transaction that created the event. That way we can retreive the deal ID from the transaction hash by calling this method.

dealManagerAbi
field containing the main contract's ABI 

dealManagerAddress
field containing the main contract's address


Client Side:
The client side API is meant to be used with metamask on a web browser.
The API is divided in 2 parts, actions the seller can perform and actions the buyer can perform.
Please note that you are supposed to encrypt the emails before sending them to the blockchain because the blockchain is public. 
To help in determining which messages were encrypted by your application you can pass an encryptor UUID at the creation of the buyer/seller object. This ID will be passed to each function call an can be found as an argument of the events fired by the contract. You can get your own encryptor UUID by calling the "getEncryptorUUID" method of the SERVER side API. Calling this method will reserve the ID so nobody else can get it.
The encryptor UUID default to 1, which is our personnal UUID. But we won't handle unencrypted events sent to our ID. If you use this API you have to handle the process of messaging your users of each events.

Before you do anything with the API you have to make sure the page also as a Web3 script and that you called `ethermediary.createDealManager()`

Most function of the API return a promise

Here is an example of creating a new deal:

    //I got this ID by calling the server side api "getEncryptorUUID()"
    var myID = 45215123;
    var encryptedBuyerEmail = "...";
    var encryptedSellerEmail = "...";
    var sellerPublicAddress = "...";

    ethermediary.createDealManager()
    var buyer = ethermediary.buyer(web3.eth.accounts[0], myID);
    buyer.createDeal(1, encryptedBuyerEmail, sellerPublicAddress, encryptedSellerEmail)
    .then(function(transactionHash){
        console.log("transaction sent, here is your transaction hash: " + transactionHash);
    })
    .catch(function(err){
        console.log("error sending transaction:", err);
    });

