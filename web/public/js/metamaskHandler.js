var oldClick = onClick;
onClick = overrideOnClick;

function resetOverride() {
  onClick = oldClick;
}

function overrideOnClick(content) {
  if (content == "newDealDone") {
    makeTransaction();
  } else {
    resetOverride();
    onClick(content);
  }
}

function makeTransaction() {
  ethermediary.createDealManager();
  var buyer = ethermediary.buyer(web3.eth.accounts[0]);

  buyer
    .createDeal(
      dealData.amount,
      dealData.buyer_email,
      dealData.seller_address,
      dealData.seller_email
    )
    .then(function (transactionHash) {
      console.log(
        "transaction sent, here is your transaction hash: " + transactionHash
      );
      dealData.transactionHash = transactionHash;
      resetOverride();
      onClick("newDealDone");
    })
    .catch(function (err) {
      console.log("error sending transaction:", err);
    });
}
