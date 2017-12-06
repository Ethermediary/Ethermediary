pragma solidity ^0.4.4;

contract ManagerInterface{
    function SELLER_answerOffer(uint id, bool answer) payable;
}

contract SellerBridge{
    address dealManager;
    uint id;
    bool answer;

    function SellerBridge(address dealManagerAddress, uint dealId, bool givenAnswer) 
    {
        dealManager = dealManagerAddress;
        id = dealId;
        answer = givenAnswer;
    }

    function () payable {
        ManagerInterface(dealManager)
            .SELLER_answerOffer
            .value(msg.value)(id, answer);
        suicide(msg.sender);
    }
}