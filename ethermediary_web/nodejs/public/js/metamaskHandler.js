//this script will be inserted after the window already loaded
//so no window.onload here
if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
    console.log("metamask found");
    onClick = overrideOnClick;
    //override the on click to use web3 myself
}else{
    console.log("metamask not found using web server");
}

function overrideOnClick(){
    try{
        makeTransaction();
    }catch(err){
        console.log(err);
    }
}

function makeTransaction(){
    var dealData = JSON.parse(document.getElementById("deal").getAttribute("data-deal"));

    ethermediary.createDealManager();
    var buyer = ethermediary.buyer(web3.eth.accounts[0]);
    
    buyer.createDeal(dealData.amount, dealData.buyer_email,
        dealData.seller_address, dealData.seller_email)
    .then(function(transactionHash){
        console.log("transaction sent, here is your transaction hash: " + transactionHash);
        sendServerTransactionHash(transactionHash);
    })
    .catch(function(err){
        console.log("error sending transaction:");
        console.log(err);
    });
}

function sendServerTransactionHash(transactionHash){
    let data = {
        transactionHash: transactionHash
    };

    $.ajax({
        url: document.location.origin + "/dealCreated",
        type: 'POST',
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json; charset=utf-8",
        error: function(err){
            console.log("error:");
            console.log(err);
        },
        success: function (data) {
            $("#content").html(data);
        }
    });
}