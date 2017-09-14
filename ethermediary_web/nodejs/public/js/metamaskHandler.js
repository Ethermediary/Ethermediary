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
    console.log("salut");
    //get the abi and address of the manager contract from the server, in case it got updated
    //and put it in window.managerAbi and window.managerAddress
    window.dealData = JSON.parse(document.getElementById("deal").getAttribute("data-deal"));
    parseAbiAndAddress(executeTransaction);
}

function executeTransaction(){
    window.managerContract = window.web3.eth.contract(window.managerAbi).at(window.managerAddress);
    
    
    window.managerContract.BUYER_createDeal(
        window.web3.toWei(window.dealData.amount, 'ether'),
        window.dealData.buyer_email, 
        window.dealData.seller_address, 
        window.dealData.seller_email, 
        {
            value: window.web3.toWei(parseInt(window.dealData.amount) * 1.1, 'ether'), 
            from: window.web3.eth.accounts[0], 
            gas: 300000
        },
        function(err, res){
            if(err){
                console.log("error:" + err);
            }else{
                console.log("transaction result:")
                console.log(res);
                sendServerTransactionHash(res);
            }
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

function parseAbiAndAddress(callback){
    $.ajax({ 
        url: "/eth/managerAbi", 
        success: function(file_content) {
            eval("window.managerAbi=" + file_content);

            $.ajax({ 
                url: "/eth/managerAddress", 
                success: function(file_content) {
                    window.managerAddress = file_content.trim();
                    callback();
                },
                error: function(err){
                    console.log("error parsing address:");
                    //TODO proper error handling
                    console.log(err);
                }
            });

        },
        error: function(err){
            console.log("error parsing abi:");
            //TODO proper error handling
            console.log(err);
        }
    });


}