if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
    console.log("metamask found");
    if(web3.eth.accounts[0] == undefined)
        onClick('no_metamask');
    else
        document.getElementById("deal").setAttribute("data-deal", web3.eth.accounts[0]);
    //override the on click to use web3 myself
}else{
    console.log("metamask not found using web server");
    //onClick('no_metamask');
}
