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

	State public state = State.INIT;
	State stateBeforeCancel;
	uint public offer;
	uint public cautionBuyer;
	uint public cautionSeller;
	bool public allowRefund;
	address buyer;
	address seller;
	address taxCollector;

	function SampleContract(){
		taxCollector = msg.sender;
	}

	modifier onlyBuyer(){
		require(msg.sender == buyer);
		_;
	}

	modifier onlySeller(){
		require(msg.sender == seller);
		_;
	}

	modifier onlyTaxCollector(){
		require(msg.sender == taxCollector);
		_;
	}

	modifier inState(State s){
		require(s == state);
		_;
	}

	modifier inState2(State s1, State s2){
		require(state == s1 || state == s2);
		_;
	}

	modifier condition(bool _condition){
		require(_condition);
		_;
	}

	function BUYER_makeOffer(uint amount) payable inState(State.INIT) returns(bool, string){
		if(msg.value < (amount*11)/10)
			return (false, "message value is not amount * 1.1");
		buyer = msg.sender;
		offer = amount;
		cautionBuyer = msg.value - amount;
		state = State.OFFER_MADE;
		return (true, toString(offer));
	}

	function BUYER_cancelOffer() inState(State.OFFER_MADE) onlyBuyer{
		state = State.DONE;
		refund();
	}

	function BUYER_receivedPackage() inState2(State.WAITING_SEND, State.WAITING_ARRIVE) onlyBuyer{
		state = State.DONE;
		finishTransaction();
	}

	function BUYER_receivedBadPackage() 
		inState2(State.WAITING_SEND, State.WAITING_ARRIVE)
		onlyBuyer
		condition(allowRefund)
	{
		state = State.SENDING_BACK_BAD_PACKAGE;
	}

	function BUYER_sentBackBadPackage() 
		inState(State.SENDING_BACK_BAD_PACKAGE) 
		onlyBuyer 
		condition(allowRefund)
	{
		state = State.SENT_BACK_BAD_PACKAGE;
	}

	function BUYER_askForCancel() onlyBuyer{
		require(uint(state) >= uint(State.WAITING_SEND) && uint(state) < uint(State.MUTUAL_CANCEL_BUYER));
		stateBeforeCancel = state;
		state = State.MUTUAL_CANCEL_BUYER;
	}

	function BUYER_acceptCancel() onlyBuyer inState(State.MUTUAL_CANCEL_SELLER){
		state = State.DONE;
		refund();
	}

	function BUYER_refuseCancel() onlyBuyer inState(State.MUTUAL_CANCEL_SELLER){
		state = stateBeforeCancel;
	}

	function SELLER_answerOffer(bool answer, bool canRefund) 
		payable 
		inState(State.OFFER_MADE) 
		returns (bool, string)
	{
		if(answer){
			if(canRefund && msg.value < (offer*1)/10)
				return (false, "you must provide at least 10% of the offer as a caution if you allow refunds");
			
			seller = msg.sender;
			state = State.WAITING_SEND;
			allowRefund = canRefund;
			if(canRefund)
				cautionSeller = msg.value;
			
			return (true, "offer accepted");
		}else{
			state = State.DONE;
			refund();
			return (true, "offer rejected, refunded buyer");
		}
	}

	function SELLER_cancelAcceptation() inState(State.WAITING_SEND) onlySeller{
		state = State.DONE;
		refund();
	}

	function SELLER_confirmSend() inState(State.WAITING_SEND) onlySeller{
		state = State.WAITING_ARRIVE;
	}

	function SELLER_receivedBadPackage() 
		inState2(State.SENDING_BACK_BAD_PACKAGE, State.SENT_BACK_BAD_PACKAGE)
		onlySeller
		condition(allowRefund)
	{
		state = State.DONE;
		refund();
	}

	function SELLER_askCancel() onlySeller{
		require(uint(state) >= uint(State.WAITING_ARRIVE) && uint(state) < uint(State.MUTUAL_CANCEL_BUYER));
		stateBeforeCancel = state;
		state = State.MUTUAL_CANCEL_SELLER;
	}

	function SELLER_acceptCancel() onlySeller inState(State.MUTUAL_CANCEL_BUYER){
		state = State.DONE;
		refund();
	}

	function SELLER_refuseCancel() onlySeller inState(State.MUTUAL_CANCEL_BUYER){
		state = stateBeforeCancel;
	}

//test if the refund and finish transaction work 
	function refund() private {
		var toBuyer = offer + cautionBuyer;
		var toSeller = cautionSeller;
		offer = 0;
		cautionBuyer = 0;
		cautionSeller = 0;

		buyer.transfer(toBuyer);
		if(toSeller != 0){
			seller.transfer(toSeller);
		}
	}

	function finishTransaction() private {
		/*var toSeller = ;
		var toBuyer = ;
		offer = 0;
		cautionSeller = 0;
		cautionBuyer = 0;*/

		seller.transfer(offer + cautionSeller);
		buyer.transfer(cautionBuyer);
	}

	function EMERGENCY_finishTransaction() onlyTaxCollector{
		finishTransaction();
	}

	function EMERGENCY_refund() onlyTaxCollector{
		refund();
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