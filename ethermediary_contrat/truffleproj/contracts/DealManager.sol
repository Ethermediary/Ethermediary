pragma solidity ^0.4.4;

contract DealManager {

	function DealManager() {
		taxCollector = msg.sender;
	}

	struct User {
		address _address;
		string email;
	}

	struct Deal {
		User buyer;
		User seller;
		uint offer;
		uint cautionSeller;
		uint cautionBuyer;
		State state;
	}

	enum State{
		INIT,
		OFFER_MADE,
		ACCEPTED,
		BUYER_ASKED_CANCEL,
		SELLER_ASKED_CANCEL
	}
	address private taxCollector;
	uint private taxCollected;
	bool public muted = false;
	mapping(uint => Deal) deals;

	event NewDeal(uint id, address buyer, string emailBuyer, address seller, string emailSeller, uint value);
	event DealAnswered(uint id, bool answer);
	event SellerAskedCancel(uint id);
	event BuyerAskedCancel(uint id);
	event SellerRefusedCancel(uint id);
	event BuyerRefusedCancel(uint id);
	event DealOver(string buyerEmail, string sellerEmail, string reason);

	function BUYER_createDeal(uint amount, string myEmail, address seller, string sellerEmail) 
		payable condition(!muted)
	{
 		require(msg.value >= (amount*11)/10);

		uint uuid = generateUUID();
		Deal storage newDeal = deals[uuid];

		newDeal.buyer._address = msg.sender;
		newDeal.buyer.email = myEmail;
		newDeal.seller._address = seller;
		newDeal.seller.email = sellerEmail;
		newDeal.offer = amount;
		newDeal.cautionBuyer = msg.value - amount;
		newDeal.state = State.OFFER_MADE;
		NewDeal(uuid, msg.sender, myEmail, seller, sellerEmail, msg.value);
	}

	function BUYER_cancelOffer(uint id) inState(id, State.OFFER_MADE) onlyBuyer(id) {
		refund(id);
	}

	function BUYER_receivedPackage(uint id) onlyBuyer(id) inState(id, State.ACCEPTED){
		finishTransaction(id);
	}

	function BUYER_askCancel(uint id) onlyBuyer(id) inState(id, State.ACCEPTED) {
		deals[id].state = State.BUYER_ASKED_CANCEL;
		BuyerAskedCancel(id);
	}

	function BUYER_acceptCancel(uint id) onlyBuyer(id) inState(id, State.SELLER_ASKED_CANCEL) {
		refund(id);
	}

	function BUYER_refuseCancel(uint id) onlyBuyer(id) inState(id, State.SELLER_ASKED_CANCEL) {
		deals[id].state = State.ACCEPTED;
		BuyerRefusedCancel(id);
	}

	function SELLER_answerOffer(uint id, bool answer) payable onlySeller(id) inState(id, State.OFFER_MADE){
		Deal storage deal = deals[id];
		if(answer){
			require(msg.value >= deal.offer/10);
			deal.state = State.ACCEPTED;
			deal.cautionSeller = msg.value;
		}else{
			refund(id);
		}
		DealAnswered(id, answer);
	}

	function SELLER_askCancel(uint id) onlySeller(id) inState(id, State.ACCEPTED){
		deals[id].state = State.SELLER_ASKED_CANCEL;
		SellerAskedCancel(id);
	}

	function SELLER_acceptCancel(uint id) onlySeller(id) inState(id, State.BUYER_ASKED_CANCEL) {
		refund(id);
	}

	function SELLER_refuseCancel(uint id) onlySeller(id) inState(id, State.BUYER_ASKED_CANCEL) {
		deals[id].state = State.ACCEPTED;
		SellerRefusedCancel(id);
	}

	function buyerCheated(uint id) onlyTaxCollector {
		Deal storage deal = deals[id];
		uint toSeller = deal.cautionSeller + deal.offer;
		deal.cautionSeller = 0;
		deal.offer = 0;

		taxCollected += deal.cautionBuyer;
		deal.cautionBuyer = 0;

		deal.seller._address.transfer(toSeller);

		DealOver(deal.buyer.email, deal.seller.email, "buyerCheated");	
		delete deals[id];
	}

	function sellerCheated(uint id) onlyTaxCollector {
		Deal storage deal = deals[id];
		
		uint toBuyer = deal.cautionBuyer + deal.offer;
		taxCollected += deal.cautionSeller;
		deal.cautionSeller = 0;
		deal.offer = 0;
		deal.cautionBuyer = 0;

		deal.buyer._address.transfer(toBuyer);

		DealOver(deal.buyer.email, deal.seller.email, "sellerCheated");	
		delete deals[id];
	}

	function muteContract() onlyTaxCollector condition(!muted) {
		muted = true;
	}

	function getDealInfo(uint id) constant
		returns (uint dealId, address buyer, string emailBuyer, 
			address seller, string emailSeller, uint offer, 
			uint cautionSeller, uint cautionBuyer, State state)
	{
		Deal storage deal = deals[id];
		require(deal.state != State.INIT);
		require(msg.sender == deal.buyer._address 
			|| msg.sender == deal.seller._address 
			|| msg.sender == taxCollector);
		return (id, deal.buyer._address, deal.buyer.email, 
			deal.seller._address, deal.seller.email, deal.offer, 
			deal.cautionSeller, deal.cautionBuyer, deal.state);
	}

	function dealExists(uint id) constant returns (bool){
		return deals[id].state != State.INIT;
	}

	function withdrawTax() onlyTaxCollector {
		taxCollected = 0;
		taxCollector.transfer(taxCollected);
	}

	function getTax() onlyTaxCollector returns (uint) {
		return taxCollected;
	}
	
	function refund(uint id) private {
		Deal storage ref = deals[id];

		var toBuyer = ref.offer + ref.cautionBuyer;
		var toSeller = ref.cautionSeller;
		ref.offer = 0;
		ref.cautionBuyer = 0;
		ref.cautionSeller = 0;

		ref.buyer._address.transfer(toBuyer);
		if(toSeller != 0){
			ref.seller._address.transfer(toSeller);
		}

		DealOver(ref.buyer.email, ref.seller.email, "refund");
		delete deals[id];
	}

	function finishTransaction(uint id) private {
		Deal storage ref = deals[id];

		var toSeller = ref.offer + ref.cautionSeller;
		var toBuyer = ref.cautionBuyer;
		ref.offer = 0;
		ref.cautionSeller = 0;
		ref.cautionBuyer = 0;

		ref.seller._address.transfer(toSeller);
		ref.buyer._address.transfer(toBuyer);
		
		DealOver(ref.buyer.email, ref.seller.email, "finish");		
		delete deals[id];
	}

	modifier onlyBuyer(uint id){
		require(msg.sender == deals[id].buyer._address);
		_;
	}

	modifier onlySeller(uint id){
		require(msg.sender == deals[id].seller._address);
		_;
	}

	modifier onlyTaxCollector(){
		require(msg.sender == taxCollector);
		_;
	}

	modifier inState(uint id, State s){
		require(s == deals[id].state);
		_;
	}

	modifier condition(bool cond){
		require(cond);
		_;
	}

	function rand(uint min, uint max, uint seed) private returns (uint){
        return uint(sha3(seed))%(min+max)-min;
	}

	function generateUUID() private returns (uint res){
		//max uint = 2**53 - 1; = 9007199254740991
		//this is the max int for javascript, since most wallet work on javascript engine doing more than that
		//will break everything

		uint i = 0;
		do{
			res = rand(0, 9007199254740991, block.timestamp + i);
			i++;
		}while(deals[res].state != State.INIT);	

		return res;
	}
}