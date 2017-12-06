var DealManager = artifacts.require("./DealManager.sol");

//TODO en situation de prod, faire un call avant pour tester si c'est possible
contract("DealManager", function(accounts){
	var deal;
	var inst;
	it("should create a deal and complete it", function(){
		return DealManager.deployed().then(function(instance){
			inst = instance;
			return instance.BUYER_createDeal(100, "email",
			 accounts[0], "emailseller", {value:110});
		})
		.then(function(result){
			let log = result.logs[0].args;
			assert(log.id.toNumber() != 0);
			assert.equal(log.buyer, accounts[0]);
			assert.equal(log.seller, accounts[0]);
			assert.equal(log.emailSeller, "emailseller");
			assert.equal(log.value, 110);
			deal = log.id;
			return inst.getDealInfo.call(deal);
		})
		.then(function(result){
			matchDealInfo(result, deal, accounts[0], "email", accounts[0], 
				"emailseller", 100, 0, 10, 1);			
			return inst.SELLER_answerOffer(deal, true, {value: 10});
		})
		.then(function(){
			return inst.getDealInfo.call(deal);
		})
		.then(function(result){
			matchDealInfo(result, deal, accounts[0], "email", accounts[0],
				"emailseller", 100, 10, 10, 2);
				return inst.BUYER_receivedPackage(deal);
		})
		.then(function(result){
			return inst.dealExists.call(deal);
		})
		.then(function(result){
			assert.equal(result, false);
		});
	});

	it("should create a deal and not accept it", function(){
		return DealManager.deployed().then(function(instance){
			inst = instance;
			return instance.BUYER_createDeal(100, "email",
			 accounts[0], "emailseller", {value:110});
		})
		.then(function(result){
			let log = result.logs[0].args;
			assert(log.id.toNumber() != 0);
			assert.equal(log.buyer, accounts[0]);
			assert.equal(log.seller, accounts[0]);
			assert.equal(log.emailSeller, "emailseller");
			assert.equal(log.value, 110);
			deal = log.id;
			return inst.getDealInfo.call(deal);
		})
		.then(function(result){
			matchDealInfo(result, deal, accounts[0], "email", accounts[0], 
				"emailseller", 100, 0, 10, 1);			
			return inst.SELLER_answerOffer(deal, false);
		})
		.then(function(result){
			return inst.dealExists.call(deal);
		})
		.then(function(result){
			assert.equal(result, false);
		});
	});

	
});

function matchDealInfo(result, deal, buyer, email,
	 seller, emailSeller, offer, cautionSeller, 
	 cautionBuyer, state)
{
	assert.equal(result[0].toNumber(), deal.toNumber());
	assert.equal(result[1], buyer);
	assert.equal(result[2], email);
	assert.equal(result[3], seller);
	assert.equal(result[4], emailSeller);
	assert.equal(result[5], offer);
	assert.equal(result[6], cautionSeller);
	assert.equal(result[7], cautionBuyer);
	assert.equal(result[8], state);
}