var Web3 = require("web3");
var ethermediary = require("./ethermediary.js");

ethermediary.setWeb3Provider(new Web3.providers.HttpProvider("http://localhost:8545"));

// ethermediary.buyer.createDeal(1.1, 1, "buyermail", "0x1508752493e5199ac49bb9f8f889efe396601bd6",
// "sellermeail", 1, "0x1508752493e5199ac49bb9f8f889efe396601bd6");
ethermediary.retreiveDealId("0xd14943faa574afd2dd1e26e6aa56442306c219bb1d9018963b04e43f7a8ab590")
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