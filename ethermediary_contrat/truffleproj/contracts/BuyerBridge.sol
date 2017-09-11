pragma solidity ^0.4.4;

contract ManagerInterface{
    function BUYER_createDeal(uint amount, string myEmail, address seller, string sellerEmail) payable;
}

contract BuyerBridge{
    address dealManager;
    uint _amount;
    string _myEmail;
    address _seller;
    string _sellerEmail;

    function BuyerBridge(address dealManagerAddress, 
        uint amount, string myEmail, address seller, 
        string sellerEmail) 
    {
        dealManager = dealManagerAddress;
        _amount = amount;
        _myEmail = myEmail;
        _seller = seller;
        _sellerEmail = sellerEmail;
    }

    function () payable {
        ManagerInterface(dealManager)
            .BUYER_createDeal
            .value(msg.value)(_amount, _myEmail, _seller, _sellerEmail);
        suicide(msg.sender);
    }
}