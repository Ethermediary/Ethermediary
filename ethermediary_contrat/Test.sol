pragma solidity ^0.4.11;

contract SampleContract{
	enum State{
		INIT, 
		OFFER_MADE,
		WAITING_SEND,
		WAITING_ARRIVE,
		SENDING_BACK_BAD_PACKAGE,
		SENT_BACK_BAD_PACKAGE,
		MUTUAL_CANCEL_BUYER,
		MUTUAL_CANCEL_SELLER,
		DONE
	}

	address taxCollector;
	struct Exchange{
		State state;
		State stateBeforeCancel;
		uint offer;
		uint cautionBuyer;
		uint cautionSeller;
		bool allowRefund;
		address buyer;
		address seller;
	}
	mapping (uint => Exchange) exchanges;
	event NewExchange(uint id);
	event SayState(uint state, uint offer, uint cautionBuyer, uint cautionSeller, 
		bool allowRefund, address buyer, address seller);

	function SampleContract(){
		taxCollector = msg.sender;
	}

	modifier onlyBuyer(uint id){
		require(msg.sender == exchanges[id].buyer);
		_;
	}

	modifier onlySeller(uint id){
		require(msg.sender == exchanges[id].seller);
		_;
	}

	modifier onlyTaxCollector(){
		require(msg.sender == taxCollector);
		_;
	}

	modifier inState(uint id, State s){
		require(s == exchanges[id].state);
		_;
	}

	modifier inState2(uint id, State s1, State s2){
		require(exchanges[id].state == s1 || exchanges[id].state == s2);
		_;
	}

	modifier refundAllowed(uint id){
		require(exchanges[id].allowRefund);
		_;
	}

	function BUYER_makeOffer(uint amount) payable returns(bool, string){
		if(msg.value < (amount*11)/10)
			return (false, "message value is not amount * 1.1");

		uint uuid = generateUUID();
		Exchange storage newExchange = exchanges[uuid];
		newExchange.buyer = msg.sender;
		newExchange.offer = amount;
		newExchange.cautionBuyer = msg.value - amount;
		newExchange.state = State.OFFER_MADE;
		exchanges[uuid] = newExchange;
		NewExchange(uuid);
		return (true, toString(uuid));
	}

	function BUYER_cancelOffer(uint id) inState(id, State.OFFER_MADE) onlyBuyer(id){
		exchanges[id].state = State.DONE;
		refund(id);
	}

	function BUYER_receivedPackage(uint id) inState2(id, State.WAITING_SEND, State.WAITING_ARRIVE) onlyBuyer(id){
		exchanges[id].state = State.DONE;
		finishTransaction(id);
	}

	function BUYER_receivedBadPackage(uint id) 
		inState2(id, State.WAITING_SEND, State.WAITING_ARRIVE)
		onlyBuyer(id)
		refundAllowed(id)
	{
		exchanges[id].state = State.SENDING_BACK_BAD_PACKAGE;
	}

	function BUYER_sentBackBadPackage(uint id) 
		inState(id, State.SENDING_BACK_BAD_PACKAGE) 
		onlyBuyer(id)
		refundAllowed(id)
	{
		exchanges[id].state = State.SENT_BACK_BAD_PACKAGE;
	}

	function BUYER_askForCancel(uint id) onlyBuyer(id){
		Exchange storage ref = exchanges[id];
		require(uint(ref.state) >= uint(State.WAITING_SEND) && uint(ref.state) < uint(State.MUTUAL_CANCEL_BUYER));
		ref.stateBeforeCancel = ref.state;
		ref.state = State.MUTUAL_CANCEL_BUYER;
	}

	function BUYER_acceptCancel(uint id) onlyBuyer(id) inState(id, State.MUTUAL_CANCEL_SELLER){
		exchanges[id].state = State.DONE;
		refund(id);
	}

	function BUYER_refuseCancel(uint id) onlyBuyer(id) inState(id, State.MUTUAL_CANCEL_SELLER){
		exchanges[id].state = exchanges[id].stateBeforeCancel;
	}

	function SELLER_answerOffer(uint id, bool answer, bool canRefund) 
		payable 
		inState(id, State.OFFER_MADE) 
		returns (bool, string)
	{
		Exchange storage ref = exchanges[id];

		if(answer){
			if(canRefund && msg.value < (ref.offer*1)/10)
				return (false, "you must provide at least 10% of the offer as a caution if you allow refunds");

			ref.seller = msg.sender;
			ref.state = State.WAITING_SEND;
			ref.allowRefund = canRefund;
			if(canRefund)
				ref.cautionSeller = msg.value;
			
			return (true, "offer accepted");
		}else{
			ref.state = State.DONE;
			refund(id);
			return (true, "offer rejected, refunded buyer");
		}
	}

	function SELLER_cancelAcceptation(uint id) inState(id, State.WAITING_SEND) onlySeller(id){
		exchanges[id].state = State.DONE;
		refund(id);
	}

	function SELLER_confirmSend(uint id) inState(id, State.WAITING_SEND) onlySeller(id){
		exchanges[id].state = State.WAITING_ARRIVE;
	}

	function SELLER_receivedBadPackage(uint id) 
		inState2(id, State.SENDING_BACK_BAD_PACKAGE, State.SENT_BACK_BAD_PACKAGE)
		onlySeller(id)
		refundAllowed(id)
	{
		exchanges[id].state = State.DONE;
		refund(id);
	}

	function SELLER_askForCancel(uint id) onlySeller(id){
		Exchange storage ref = exchanges[id];
		require(uint(ref.state) >= uint(State.WAITING_ARRIVE) && uint(ref.state) < uint(State.MUTUAL_CANCEL_BUYER));
		ref.stateBeforeCancel = ref.state;
		ref.state = State.MUTUAL_CANCEL_SELLER;
	}

	function SELLER_acceptCancel(uint id) onlySeller(id) inState(id, State.MUTUAL_CANCEL_BUYER){
		exchanges[id].state = State.DONE;
		refund(id);
	}

	function SELLER_refuseCancel(uint id) onlySeller(id) inState(id, State.MUTUAL_CANCEL_BUYER){
		exchanges[id].state = exchanges[id].stateBeforeCancel;
	}

//test if the refund and finish transaction work 
	function refund(uint id) private {
		Exchange storage ref = exchanges[id];

		var toBuyer = ref.offer + ref.cautionBuyer;
		var toSeller = ref.cautionSeller;
		ref.offer = 0;
		ref.cautionBuyer = 0;
		ref.cautionSeller = 0;

		ref.buyer.transfer(toBuyer);
		if(toSeller != 0){
			ref.seller.transfer(toSeller);
		}

		delete exchanges[id];
	}

	function finishTransaction(uint id) private {
		Exchange storage ref = exchanges[id];

		var toSeller = ref.offer + ref.cautionSeller;
		var toBuyer = ref.cautionBuyer;
		ref.offer = 0;
		ref.cautionSeller = 0;
		ref.cautionBuyer = 0;

		ref.seller.transfer(toSeller);
		ref.buyer.transfer(toBuyer);
		
		delete exchanges[id];
	}

	function EMERGENCY_finishTransaction(uint id) onlyTaxCollector{
		finishTransaction(id);
	}

	function EMERGENCY_refund(uint id) onlyTaxCollector{
		refund(id);
	}

	//returns all the info of an exchange
	function getInfo(uint id)  returns (uint, uint, uint, uint, bool, address, address){
		Exchange storage ref = exchanges[id];
		require(ref.state != State.INIT);
		require(msg.sender == ref.buyer || msg.sender == ref.seller || msg.sender == taxCollector);
		/*State state;
		State stateBeforeCancel;
		uint offer;
		uint cautionBuyer;
		uint cautionSeller;
		bool allowRefund;
		address buyer;
		address seller*/
		SayState(uint(ref.state), ref.offer, ref.cautionBuyer, ref.cautionSeller, ref.allowRefund, ref.buyer, ref.seller);
		return (uint(ref.state), ref.offer, ref.cautionBuyer, ref.cautionSeller, ref.allowRefund, ref.buyer, ref.seller);
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
		}while(exchanges[res].state != State.INIT);	

		return res;
	}

	function toString(uint v) private constant returns (string){
		return bytes32ToString(uintToBytes(v));
	}

	function uintToBytes(uint v) private constant returns (bytes32 ret) {
	    if (v == 0) {
	        ret = '0';
	    } else {
	        while (v > 0) {
	            ret = bytes32(uint(ret) / (2 ** 8));
	            ret |= bytes32(((v % 10) + 48) * 2 ** (8 * 31));
	            v /= 10;
	        }
	    }
	    return ret;
	}

	function bytes32ToString (bytes32 data) private constant returns (string) {
	    bytes memory bytesString = new bytes(32);
	    for (uint j=0; j<32; j++) {
	        byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
	        if (char != 0) {
	            bytesString[j] = char;
	        }
	    }
	    return string(bytesString);
	}
}