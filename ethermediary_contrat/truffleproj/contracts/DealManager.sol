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
		uint encryptionAddress;
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
	mapping(uint => uint) encryptors;

	event NewDeal(uint id, address buyer, string emailBuyer, 
		address seller, string emailSeller, 
		uint value, uint encryptionAddress);
	event DealAnswered(uint id, bool answer, uint encryptionAddress);
	event SellerAskedCancel(uint id, uint encryptionAddress);
	event BuyerAskedCancel(uint id, uint encryptionAddress);
	event SellerRefusedCancel(uint id, uint encryptionAddress);
	event BuyerRefusedCancel(uint id, uint encryptionAddress);
	event DealOver(string buyerEmail, string sellerEmail, string reason, uint encryptionAddress);

	function BUYER_createDeal(uint amount, string myEmail, 
		address seller, string sellerEmail, uint encryptionAddress) 
		payable condition(!muted)
	{
 		require(msg.value >= (amount*11)/10);
		uint uuid = createDeal(amount, myEmail, seller, sellerEmail, encryptionAddress);
		NewDeal(uuid, msg.sender, myEmail, seller, sellerEmail, msg.value, encryptionAddress);
	}

	function createDeal(uint amount, string myEmail, address seller, 
		string sellerEmail, uint encryptionAddress) 
		private returns(uint)
	{
		uint uuid = generateUUID();
		Deal storage newDeal = deals[uuid];

		newDeal.buyer._address = msg.sender;
		newDeal.buyer.email = myEmail;
		newDeal.seller._address = seller;
		newDeal.seller.email = sellerEmail;
		newDeal.offer = amount;
		newDeal.cautionBuyer = msg.value - amount;
		newDeal.state = State.OFFER_MADE;
		newDeal.encryptionAddress = encryptionAddress;
		return uuid;
	}

	function BUYER_cancelOffer(uint id, uint encryptionAddress) inState(id, State.OFFER_MADE) onlyBuyer(id) {
		refund(id, encryptionAddress);
	}

	function BUYER_receivedPackage(uint id, uint encryptionAddress) onlyBuyer(id) inState(id, State.ACCEPTED){
		finishTransaction(id, encryptionAddress);
	}

	function BUYER_askCancel(uint id, uint encryptionAddress) onlyBuyer(id) inState(id, State.ACCEPTED) {
		deals[id].state = State.BUYER_ASKED_CANCEL;
		BuyerAskedCancel(id, encryptionAddress);
	}

	function BUYER_acceptCancel(uint id, uint encryptionAddress) onlyBuyer(id) inState(id, State.SELLER_ASKED_CANCEL) {
		refund(id, encryptionAddress);
	}

	function BUYER_refuseCancel(uint id, uint encryptionAddress) onlyBuyer(id) inState(id, State.SELLER_ASKED_CANCEL) {
		deals[id].state = State.ACCEPTED;
		BuyerRefusedCancel(id, encryptionAddress);
	}

	function SELLER_answerOffer(uint id, bool answer, uint encryptionAddress) payable onlySeller(id) inState(id, State.OFFER_MADE){
		Deal storage deal = deals[id];
		if(answer){
			require(msg.value >= deal.offer/10);
			deal.state = State.ACCEPTED;
			deal.cautionSeller = msg.value;
		}else{
			refund(id, encryptionAddress);
		}
		DealAnswered(id, answer, encryptionAddress);
	}

	function SELLER_askCancel(uint id, uint encryptionAddress) onlySeller(id) inState(id, State.ACCEPTED){
		deals[id].state = State.SELLER_ASKED_CANCEL;
		SellerAskedCancel(id, encryptionAddress);
	}

	function SELLER_acceptCancel(uint id, uint encryptionAddress) onlySeller(id) inState(id, State.BUYER_ASKED_CANCEL) {
		refund(id, encryptionAddress);
	}

	function SELLER_refuseCancel(uint id, uint encryptionAddress) onlySeller(id) inState(id, State.BUYER_ASKED_CANCEL) {
		deals[id].state = State.ACCEPTED;
		SellerRefusedCancel(id, encryptionAddress);
	}

	function buyerCheated(uint id, uint encryptionAddress) onlyTaxCollector {
		Deal storage deal = deals[id];
		uint toSeller = deal.cautionSeller + deal.offer;
		deal.cautionSeller = 0;
		deal.offer = 0;

		taxCollected += deal.cautionBuyer;
		deal.cautionBuyer = 0;

		deal.seller._address.transfer(toSeller);

		DealOver(deal.buyer.email, deal.seller.email, "buyerCheated", encryptionAddress);	
		deleteDeal(id);
	}

	function sellerCheated(uint id, uint encryptionAddress) onlyTaxCollector {
		Deal storage deal = deals[id];
		
		uint toBuyer = deal.cautionBuyer + deal.offer;
		taxCollected += deal.cautionSeller;
		deal.cautionSeller = 0;
		deal.offer = 0;
		deal.cautionBuyer = 0;

		deal.buyer._address.transfer(toBuyer);

		DealOver(deal.buyer.email, deal.seller.email, "sellerCheated", encryptionAddress);	
		deleteDeal(id);
	}

	function muteContract() onlyTaxCollector condition(!muted) {
		muted = true;
	}

	function getRole(uint id, address sender) constant returns (string){
		Deal storage deal = deals[id];
		if(sender == deal.buyer._address)
			return "buyer";
		if(sender == deal.seller._address)
			return "seller";
		return "null";
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

	function getTax() constant onlyTaxCollector returns (uint) {
		return taxCollected;
	}

	function generateEncryptorUUID() constant returns (uint res){
		uint i = 0;
		do{
			res = rand(0, 9007199254740991, block.timestamp + i);
			i++;
		}while(encryptors[res] != 0);	

		return res;
	}

	function reserveEncryptorUUID(uint id) {
		require(encryptors[id] == 0);
		encryptors[id] = id;
	}
	
	function refund(uint id, uint encryptionAddress) private {
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

		DealOver(ref.buyer.email, ref.seller.email, "refund", encryptionAddress);
		deleteDeal(id);
	}

	function finishTransaction(uint id, uint encryptionAddress) private {
		Deal storage ref = deals[id];

		var toSeller = ref.offer + ref.cautionSeller;
		var toBuyer = ref.cautionBuyer;
		ref.offer = 0;
		ref.cautionSeller = 0;
		ref.cautionBuyer = 0;

		ref.seller._address.transfer(toSeller);
		ref.buyer._address.transfer(toBuyer);
		
		DealOver(ref.buyer.email, ref.seller.email, "finish", encryptionAddress);		
		deleteDeal(id);
	}

	function deleteDeal(uint id) private {
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