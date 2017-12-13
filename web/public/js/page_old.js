var offre_button,
    offre_value,
    coli_recu_button,
    coli_recu_bad_button,
    sent_back_proof_button,
    accept_offer_button,
    refuse_offer_button,
    give_proof_button,
    received_sent_back_button,
    cancel_offer_button,
    balance_contract_text,
    balance_acheteur_text,
    balance_vendeur_text,
    acheteur_screen_text,
    vendeur_screen_text,
    mutual_cancel_vendeur_button,
    mutual_cancel_acheteur_button,
    refuse_cancel_acheteur_button,
    refuse_cancel_vendeur_button,
    acheteur_cancel_offer_button;


var balance_contract = 0;
var balance_acheteur = 100;
var balance_vendeur = 100;
var acheteur_screen;
var vendeur_screen;

var buttonList;

const STATE_INIT = {
    name: "INIT", layout: [0, 1]
};
const STATE_OFFER_MADE = {
    name: "OFFER_MADE", layout: [5, 6, 14]
};
const STATE_WAITING_SEND = {
    name: "WAITING_SEND", layout: [2, 3, 7, 9, 11]
};
const STATE_WAITING_ARRIVE = {
    name: "WAITING_ARRIVE", layout: [2, 3, 11, 10]
};
const STATE_SENDING_BACK_BAD_PACKAGE = {
    name: "SENDING_BACK_BAD_PACKAGE", layout: [4, 8, 10, 11]
};
const STATE_SENT_BACK_BAD_PACKAGE = {
    name: "SENT_BACK_BAD_PACKAGE", layout: [8, 10, 11]
};
//acheteur qui initialise
const STATE_MUTUAL_CANCEL_ACHETEUR = {
    name: "MUTUAL_CANCEL_ACHETEUR", layout: [10, 13]
};
//vendeur qui initialise
const STATE_MUTUAL_CANCEL_VENDEUR = {
    name: "MUTUAL_CANCEL_VENDEUR", layout: [11, 12]
};
const STATE_DONE = {
    name: "DONE", layout: []
};
const caution = 20;

var cautionFromAcheteur = 0;
var cautionFromVendeur = 0;
var offerAmount;

var state = STATE_INIT;
var stateBeforeCancel;



window.onload = function () {
    offre_button = document.getElementById("offre_button");
    offre_value = document.getElementById("offre_value");
    coli_recu_button = document.getElementById("coli_recu");
    accept_offer_button = document.getElementById("accept_offre");
    refuse_offer_button = document.getElementById("refuse_offre");
    give_proof_button = document.getElementById("give_proof");
    balance_contract_text = document.getElementById("balance_contract");
    balance_acheteur_text = document.getElementById("balance_acheteur");
    balance_vendeur_text = document.getElementById("balance_vendeur");
    acheteur_screen_text = document.getElementById("acheteur_screen");
    vendeur_screen_text = document.getElementById("vendeur_screen");
    coli_recu_bad_button = document.getElementById("coli_recu_bad");
    sent_back_proof_button = document.getElementById("sent_back_proof");
    cancel_offer_button = document.getElementById("cancel_offer");
    received_sent_back_button = document.getElementById("received_sent_back");
    mutual_cancel_vendeur_button = document.getElementById("mutual_cancel_vendeur");
    mutual_cancel_acheteur_button = document.getElementById("mutual_cancel_acheteur");
    refuse_cancel_acheteur_button = document.getElementById("refuse_cancel_acheteur");
    refuse_cancel_vendeur_button = document.getElementById("refuse_cancel_vendeur");
    acheteur_cancel_offer_button = document.getElementById("acheteur_cancel_offer");
    //bouton annuler pour l'acheteur, bouton acheteur j'ai renvoyer le package, bouton vendeur j'ai bien recup�r� le package
    //bouton annuler pour le vendeur dispo au debut si jamais il a plus de stock/il veut plus vendre
    //bouton the package is bad i want to return it acheteur,

    buttonList = [
        offre_button,
        offre_value,
        coli_recu_button,
        coli_recu_bad_button,
        sent_back_proof_button,
        accept_offer_button,
        refuse_offer_button,
        give_proof_button,
        received_sent_back_button,
        cancel_offer_button,
        mutual_cancel_vendeur_button,
        mutual_cancel_acheteur_button,
        refuse_cancel_acheteur_button,
        refuse_cancel_vendeur_button,
        acheteur_cancel_offer_button
    ];

    offre_button.onclick = () => ACHETEUR_makeOffer(offre_value.value);
    accept_offer_button.onclick = VENDEUR_acceptOffer;
    refuse_offer_button.onclick = VENDEUR_refuseOffer;
    give_proof_button.onclick = VENDEUR_provideProof;
    coli_recu_button.onclick = ACHETEUR_receivedPackage;
    cancel_offer_button.onclick = VENDEUR_cancelOffer;
    coli_recu_bad_button.onclick = ACHETEUR_receivedBadPackage;
    sent_back_proof_button.onclick = ACHETEUR_sendBackProof;
    received_sent_back_button.onclick = VENDEUR_receivedBadPackage;
    mutual_cancel_vendeur_button.onclick = VENDEUR_mutualCancel;
    mutual_cancel_acheteur_button.onclick = ACHETEUR_mutualCancel;
    acheteur_cancel_offer_button.onclick = ACHETEUR_cancelOffer;
    refuse_cancel_acheteur_button.onclick = ACHETEUR_refuseMutualCancel;
    refuse_cancel_vendeur_button.onclick = VENDEUR_refuseMutualCancel;


    init();
}

function ACHETEUR_makeOffer(amount) {
    //on retire une somme en plus de la somme normal pour motiver le acheteur a declarer la reception de son colis
    amount = parseInt(amount);
    offerAmount = amount;
    if (state == STATE_INIT) {
        if (balance_acheteur < offerAmount+caution) {
            acheteur_screen = "you don't have enough money";
        } else {
            state = STATE_OFFER_MADE;

            balance_acheteur -= offerAmount + caution;
            balance_contract += offerAmount + caution;
            cautionFromAcheteur = caution;

            vendeur_screen = "an offer for: " + (offerAmount-caution) + " was made, accept ?";
            acheteur_screen = "offer sent, waiting for VENDEUR to answer";
        }
    }
    updateDisplay();
}

function ACHETEUR_cancelOffer() {
    if (state == STATE_OFFER_MADE) {
        state = STATE_DONE;

        refund();

        vendeur_screen = "the offer was cancelled";
        acheteur_screen = "you cancelled the offer";
    }
    updateDisplay();
}

function ACHETEUR_receivedPackage() {
    if (state == STATE_WAITING_SEND) {
        state = STATE_DONE;

        finishTransaction();

        vendeur_screen = "ACHETEUR received your package, here is a proof:[pic] please tell us next time you sent it";
        acheteur_screen = "great! have fun with your thing";
    } else if (state == STATE_WAITING_ARRIVE) {
        state = STATE_DONE;

        finishTransaction();

        vendeur_screen = "ACHETEUR received your package, here is a proof: [pic]";
        acheteur_screen = "great! have fun with your thing";
    }
    updateDisplay();
}

function ACHETEUR_receivedBadPackage(){
    if (state == STATE_WAITING_SEND) {
        state = STATE_SENDING_BACK_BAD_PACKAGE;

        acheteur_screen = "please send back the item and provide proof";
        vendeur_screen = "ACHETEUR didn't like your product, he is sending it back to you, please tell us when you sent it next time";
    } else if (state == STATE_WAITING_ARRIVE) {
        state = STATE_SENDING_BACK_BAD_PACKAGE;

        acheteur_screen = "please send back the item and provide proof";
        vendeur_screen = "ACHETEUR didn't like your product, he is sending it back to you";
    }
    updateDisplay();
}

function ACHETEUR_sendBackProof() {
    if (state == STATE_SENDING_BACK_BAD_PACKAGE) {
        state = STATE_SENT_BACK_BAD_PACKAGE;

        acheteur_screen = "thanks! you will get your money back when VENDEUR received the package";
        vendeur_screen = "ACHETEUR sent back the package here is the proof: [pic], tell us when you reiceived it";
    }
    updateDisplay();
}

function ACHETEUR_mutualCancel() {
    if (state == STATE_MUTUAL_CANCEL_VENDEUR) {
        state = STATE_DONE;

        refund();

        vendeur_screen = "trade cancelled by you";
        acheteur_screen = "trade cancelled by VENDEUR";
    } else {
        stateBeforeCancel = state;
        state = STATE_MUTUAL_CANCEL_ACHETEUR;

        acheteur_screen = "asking cancel to VENDEUR";
        vendeur_screen = "ACHETEUR wants to cancel the deal, yes/no ?";
    }
    updateDisplay();
}

function ACHETEUR_refuseMutualCancel() {
    if (state == STATE_MUTUAL_CANCEL_VENDEUR) {
        state = stateBeforeCancel;

        vendeur_screen = "ACHETEUR refused to cancel the trade";
        acheteur_screen = "you refused to cancel the trade";
    }
    updateDisplay();
}

//-------------------------------VENDEUR

function VENDEUR_acceptOffer() {
    //on retire une somme au vendeur pour l'encourager a declarer le package recu
    if (state == STATE_OFFER_MADE) {
        state = STATE_WAITING_SEND;

        balance_vendeur -= caution;
        balance_contract += caution;
        cautionFromVendeur = caution;

        acheteur_screen = "waiting for VENDEUR to send your package, if you already received it tell us";
        vendeur_screen = "please send the package and provide a proof";
    }
    updateDisplay();
}

function VENDEUR_refuseOffer() {
    if (state == STATE_OFFER_MADE) {
        state = STATE_DONE;

        refund();

        vendeur_screen = "you refused the offer";
        acheteur_screen = "VENDEUR refused your offer";
    }
    updateDisplay();
}

function VENDEUR_cancelOffer() {
    if (state == STATE_WAITING_SEND) {
        //si il l'a deja envoy� et qu'il annule il est juste con
        state = STATE_DONE;

        refund();

        acheteur_screen = "VENDEUR canceled, you got your money back";
        vendeur_screen = "you canceled";
    }
    updateDisplay();
}

function VENDEUR_provideProof() {
    if (state == STATE_WAITING_SEND) {
        state = STATE_WAITING_ARRIVE;

        acheteur_screen = "VENDEUR sent the package, here is the proof:[pic] please tell us when you receive it to get your money back";
        vendeur_screen = "thank you ! you will get paid when ACHETEUR will receive the package";
    }
    updateDisplay();
}

function VENDEUR_receivedBadPackage() {
    if (state == STATE_SENT_BACK_BAD_PACKAGE) {
        state = STATE_DONE;

        refund();

        acheteur_screen = "you package arrived! here is your money back";
        vendeur_screen = "thanks! here is your money back";
    } else if (state == STATE_SENDING_BACK_BAD_PACKAGE) {
        state = STATE_DONE;

        refund();

        acheteur_screen = "you package arrived! here is your money back, tell us when you sent it next time";
        vendeur_screen = "thanks! here is your money back";
    }
    updateDisplay();
}

function VENDEUR_mutualCancel() {
    if (state == STATE_MUTUAL_CANCEL_ACHETEUR) {
        state = STATE_DONE;

        refund();

        vendeur_screen = "trade cancelled by ACHETEUR";
        acheteur_screen = "trade cancelled by you";
    } else {
        stateBeforeCancel = state;
        state = STATE_MUTUAL_CANCEL_VENDEUR;

        acheteur_screen = "VENDEUR wants to cancel, yes/no ?";
        vendeur_screen = "asking ACHETEUR to cancel";
    }
    updateDisplay();
}

function VENDEUR_refuseMutualCancel() {
    if (state == STATE_MUTUAL_CANCEL_ACHETEUR) {
        state = stateBeforeCancel;

        acheteur_screen = "VENDEUR refused to cancel the trade";
        vendeur_screen = "you refused to cancel the trade";
    }
    updateDisplay();
}

function finishTransaction() {
    balance_acheteur += cautionFromAcheteur;
    balance_vendeur += cautionFromVendeur
    balance_contract -= cautionFromAcheteur + cautionFromVendeur;
    balance_vendeur += balance_contract;
    balance_contract = 0;
}

function refund() {
    balance_acheteur += cautionFromAcheteur;
    balance_vendeur += cautionFromVendeur;
    balance_contract -= cautionFromAcheteur + cautionFromVendeur;
    balance_acheteur += balance_contract;
    balance_contract = 0;
}

function init() {
    state = STATE_INIT;

    acheteur_screen = "please make an offer";
    vendeur_screen = "waiting for an offer";

    updateDisplay();
}

function updateDisplay() {
    balance_acheteur_text.innerHTML = balance_acheteur;
    balance_vendeur_text.innerHTML = balance_vendeur;
    balance_contract_text.innerHTML = balance_contract;

    acheteur_screen_text.innerHTML = acheteur_screen;
    vendeur_screen_text.innerHTML = vendeur_screen;

    document.getElementById("text").innerHTML = state.name;

    setState();
}

function setState() {
    for (var i = 0; i < buttonList.length; i++) {
        if (state.layout.indexOf(i) != -1) {
            buttonList[i].disabled = false;
        } else {
            buttonList[i].disabled = true;
        }
    }
}
