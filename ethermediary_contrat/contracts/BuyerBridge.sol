pragma solidity ^0.4.4;

contract ManagerInterface{
    function BUYERBRIDGE_createDeal(uint amount, address buyer, string myEmail, address seller, string sellerEmail) payable returns (bool);
}

contract BuyerBridge{
    address private dealManager;
    uint private _amount;
    address private _buyer;
    string private _myEmail;
    address private _seller;
    string private _sellerEmail;

    function BuyerBridge(address dealManagerAddress, 
        uint amount, address buyer, string myEmail, address seller, 
        string sellerEmail) 
    {
        dealManager = dealManagerAddress;
        _buyer = buyer;
        _amount = amount;
        _myEmail = myEmail;
        _seller = seller;
        _sellerEmail = sellerEmail;
    }

    function () payable {
        bool didit = ManagerInterface(dealManager)
            .BUYERBRIDGE_createDeal
            .value(this.balance)(_amount, _buyer, _myEmail, _seller, _sellerEmail);

        if(didit){
            suicide(msg.sender);
        }
    }
}