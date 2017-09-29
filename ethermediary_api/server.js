var Web3 = require("web3");
var ethermediary = require("./ethermediary.js");

ethermediary.setWeb3Provider(new Web3.providers.HttpProvider("http://localhost:8545"));

// ethermediary.buyer.createDeal(1.1, 1, "buyermail", "0x1508752493e5199ac49bb9f8f889efe396601bd6",
// "sellermeail", 1, "0x1508752493e5199ac49bb9f8f889efe396601bd6");
// ethermediary.retreiveDealId("0x55aabab6176b5d9cdd542e625953c09023687c3973676179b82c901d740dc34d")
// .then(console.log)
// .catch(console.log);
// ethermediary.getDealInfo(1)
// .then(console.log)
// .catch(console.log);

// ethermediary.watchNewDeal(function(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("new deal:");
//         console.log(data);
//     }
// });

ethermediary.getRole(4772510638018241, "0xc5cc65999ec38152f7bcb08573a0f434f1ac90b7")
.then(console.log)
.catch(console.log);



// ethermediary.getDealInfo(764761741608523)
// .then(console.log)
// .catch(console.log);

// ethermediary.generateApiUUID()
// .then(function(uuid){
//     console.log(uuid);
// })
// .catch(console.log);