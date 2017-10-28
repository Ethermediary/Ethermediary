// Ethermediary Simulation javascript

var button_offer,
    value_offer,
    received_button,
    accept_offer_button,
    refuse_offer_button,
    buyer_cancel_offer_button,
    ask_cancel_seller_button,
    ask_cancel_buyer_button,
    accept_cancel_seller_button,
    accept_cancel_buyer_button,
    refuse_cancel_buyer_button,
    refuse_cancel_seller_button,
    buyer_screen,
    seller_screen;

var contract_balance_text,
    buyer_balance_text,
    seller_balance_text,
    buyer_screen_text,
    seller_screen_text,
    offerAmount,
    buttonList,
    stateBeforeCancel;

var contract_balance = 0;
var buyer_balance = 0;
var seller_balance = 0;
var cautionFromBuyer = 0;
var cautionFromSeller = 0;

//Page layout
const STATE_INIT = {
    name: "Waiting for an offer from the buyer", layout: [0, 1]
};
const STATE_OFFER_MADE = {
    name: "An offer was made by the buyer, waiting for the seller's acceptation", layout: [2,7,8]
};
const STATE_WAITING = {
    name: "The seller accepted the offer. Waiting for the buyer's reception", layout: [3,4,9]
};
const STATE_ASK_CANCEL_BUYER = {
    name: "The buyer asked for cancelation", layout: [3,10,11]
};
const STATE_ASK_CANCEL_SELLER = {
    name: "The seller asked for cancelation", layout: [3,5,6]
};
const STATE_DONE = {
    name: "The transaction has ended", layout: []
};
const caution = 0.2;//20% caution
var state = STATE_INIT;

button_offer = document.getElementById("button_offer");
value_offer = document.getElementById("value_offer");
accept_offer_button = document.getElementById("accept_offer_button");
refuse_offer_button = document.getElementById("refuse_offer_button");
contract_balance_text = document.getElementById("contract_balance_text");
received_button = document.getElementById("received_button");
buyer_balance_text = document.getElementById("buyer_balance_text");
seller_balance_text = document.getElementById("seller_balance_text");
buyer_screen_text = document.getElementById("buyer_screen_text");
seller_screen_text = document.getElementById("seller_screen_text");
buyer_cancel_offer_button = document.getElementById("buyer_cancel_offer_button");
ask_cancel_seller_button = document.getElementById("ask_cancel_seller_button");
ask_cancel_buyer_button = document.getElementById("ask_cancel_buyer_button");
accept_cancel_buyer_button = document.getElementById("accept_cancel_buyer_button");
accept_cancel_seller_button = document.getElementById("accept_cancel_seller_button");
refuse_cancel_buyer_button = document.getElementById("refuse_cancel_buyer_button");
refuse_cancel_seller_button = document.getElementById("refuse_cancel_seller_button");
buyer_cancel_offer_button = document.getElementById("buyer_cancel_offer_button");

buttonList = [  //Where we choose what to display
  button_offer,
  value_offer,
  buyer_cancel_offer_button,
  received_button,
  ask_cancel_buyer_button,
  accept_cancel_buyer_button,
  refuse_cancel_buyer_button,
  accept_offer_button,
  refuse_offer_button,
  ask_cancel_seller_button,
  accept_cancel_seller_button,
  refuse_cancel_seller_button
];

button_offer.onclick = () => BUYER_makeOffer(value_offer.value);
accept_offer_button.onclick = SELLER_acceptOffer;
refuse_offer_button.onclick = SELLER_refuseOffer;
received_button.onclick = BUYER_received;
buyer_cancel_offer_button.onclick = BUYER_cancelOffer;
ask_cancel_seller_button.onclick = SELLER_askCancel;
ask_cancel_buyer_button.onclick = BUYER_askCancel;
accept_cancel_buyer_button.onclick = BUYER_acceptCancel;
accept_cancel_seller_button.onclick = SELLER_acceptCancel;
refuse_cancel_buyer_button.onclick = BUYER_refuseAskCancel;
refuse_cancel_seller_button.onclick = SELLER_refuseAskCancel;
buyer_cancel_offer_button.onclick = BUYER_cancelOffer;

console.log("--- Welcome into the simulation mode ---");
init(); //Initialisation


////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SELLER ////////////////////////////////////////

function BUYER_makeOffer(amount) {
    amount = parseInt(amount);
    offerAmount = amount;

    state = STATE_OFFER_MADE;
    buyer_balance -= offerAmount + (offerAmount*caution);
    contract_balance += offerAmount + (offerAmount*caution);
    cautionFromBuyer = offerAmount*caution;

    seller_screen = "The buyer offered you " + offerAmount + " ETH</br>for the object/service,</br>do you accept ?";
    buyer_screen = "Offer sent, waiting for the seller</br>to answer</br>";
    console.log("Buyer made an offer");
    updateDisplay();
}

function BUYER_cancelOffer() {
    refund();
    seller_screen = "The buyer cancelled the offer";
    buyer_screen = "You cancelled the offer";
    console.log("Buyer canceled the offer");
    state = STATE_DONE;
    updateDisplay();
}

function BUYER_acceptCancel() {
    console.log("The Buyer accepted the cancelation request");
    state = STATE_DONE;
    refund();
    seller_screen = "The buyer accepted to cancel</br>the deal</br></br>Everybody was refunded";
    buyer_screen = "You accepted to cancel the deal</br></br>Everybody was refunded";
}

function BUYER_received() {

    state = STATE_DONE;

    finishTransaction();

    seller_screen = "The buyer received your</br>object / service</br></br> You received your paiement as well as your caution back";
    buyer_screen = "You received the object / service</br></br></br>The seller has been paid and you got your caution back";
    console.log("Seller received the object / service");
    updateDisplay();
}

function BUYER_askCancel() {
    if (state == STATE_ASK_CANCEL_SELLER) {
        state = STATE_DONE;

        refund();

        seller_screen = "Trade cancelled by you";
        buyer_screen = "Trade cancelled by the seller";
    } else {
        stateBeforeCancel = state;
        state = STATE_ASK_CANCEL_BUYER;

        buyer_screen = "You made a cancelation request</br>";
        seller_screen = "The buyer wants to cancel</br>the deal, do you accept ?";
    }
    console.log("Buyer ask for cancel");
    updateDisplay();
}

function BUYER_refuseAskCancel() {
    if (state == STATE_ASK_CANCEL_SELLER) {
        state = stateBeforeCancel;

        seller_screen = "The buyer refused to cancel the trade";
        buyer_screen = "You refused to cancel the deal";
    }
    console.log("Buyer refused to cancel");
    updateDisplay();
}


////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SELLER ////////////////////////////////////////

function SELLER_acceptOffer() {
    state = STATE_WAITING;
    seller_balance -= offerAmount*caution;
    contract_balance += offerAmount*caution;
    cautionFromSeller = offerAmount*caution;
    buyer_screen = "Waiting for you to received the object / service";
    seller_screen = "Please send the object / service</br>";
    console.log("Seller accepted the offer");
    updateDisplay();
}

function SELLER_refuseOffer() {
    refund();
    state = STATE_DONE;
    seller_screen = "You refused the offer";
    buyer_screen = "The seller refused your offer";
    console.log("Seller refused the offer");
    updateDisplay();
}

function SELLER_acceptCancel() {
    console.log("The seller accepted the cancelation request");
    seller_screen = "You accepted to cancel the deal</br></br>Everybody was refunded";
    buyer_screen = "The buyer accepted to cancel</br>the deal</br></br></br>Everybody was refunded";
    state = STATE_DONE;
    refund();
}

function SELLER_askCancel() {
    stateBeforeCancel = state;
    state = STATE_ASK_CANCEL_SELLER;
    buyer_screen = "The seller wants to cancel</br>the deal, do you accept ?";
    seller_screen = "You asked the buyer to cancel</br>the deal";
    console.log("Seller asked for cancel");
    updateDisplay();
}

function SELLER_refuseAskCancel() {
    state = stateBeforeCancel;
    buyer_screen = "The seller refused to cancel</br>the deal";
    seller_screen = "You refused to cancel the deal</br>";
    console.log("Seller refused to cancel");
    updateDisplay();
}


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Machinery //////////////////////////////////////

function finishTransaction() {
    buyer_balance += offerAmount*caution;
    seller_balance += offerAmount*caution
    contract_balance -= 2*offerAmount*caution;
    seller_balance += contract_balance;
    contract_balance = 0;
    console.log("Transaction has ended");
}

function refund() {
    if(state != STATE_OFFER_MADE){
      seller_balance += offerAmount*caution;
    }
    buyer_balance += (offerAmount*caution) + offerAmount;
    contract_balance = 0;
    console.log("Everybody was refund");
    updateDisplay();
}

function init() {
    state = STATE_INIT;
    buyer_screen = "Please make an offer</br>";
    seller_screen = "Waiting for an offer";
    console.log("Initialisation of the simulation");
    updateDisplay();
}

function updateDisplay() {
    buyer_balance_text.innerHTML = buyer_balance;
    seller_balance_text.innerHTML = seller_balance;
    contract_balance_text.innerHTML = contract_balance;

    buyer_screen_text.innerHTML = buyer_screen;
    seller_screen_text.innerHTML = seller_screen;

    document.getElementById("text").innerHTML = state.name;

    setState();
}

function setState() { //Choose what to display from state
    for (var i = 0; i < buttonList.length; i++) {
        if (state.layout.indexOf(i) != -1) {
            buttonList[i].style.display = 'inline-block';
        } else {
            buttonList[i].style.display = 'none';
        }
    }
}
