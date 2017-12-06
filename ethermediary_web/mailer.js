////////////////////////////////////////////////////////////////////////////////
// This is a test section for the email rendering
// A few modification are necessary to link this renderer to the email sender

const dust = require('hoffman').dust;
const path = require('path');
const Q = require('q');

mail_path = path.join(__dirname, 'mail') + "/newDeal.dust";

var profile = function (person,meta,amount,caution,buyer_address,seller_address,frozen_time) {
    this.person = person;
    this.meta = meta;
    this.amount = amount;
    this.caution = caution;
    this.buyer_address = buyer_address;
    this.seller_address = seller_address;
    this.frozen_time = frozen_time;
};

caution = 666 * 0.20;
var mail_profile = new profile("Albert Einstein","Une tourte",666,caution,"0x5eF269666ad34eC7c03f49C20739f34FDc964356",
"0x5eF269666ad34eC7c03f49C20739f34FDc964356",365);

// Two keys need to be changed accordingly
/*if (role == "isSeller"){ mail_profile.isSeller = "isSeller"; }
else { mail_profile.isSeller = "isBuyer"; } //role = isBuyer*/
mail_profile.isBuyer = "isBuyer";// or isSeller
mail_profile.BuyerAskCancel = "BuyerAskCancel";// or SellerAskCancel

mail_profile.received = "https://ethermediary.com/idspecial";
mail_profile.cancel = "https://ethermediary.com/cancelrequest";
mail_profile.accept_deal = "https://ethermediary.com/acceptdeal";

//console.log(" ");
//console.log(mail_profile);
//console.log(" ");

function renderTemplate(data, args){  //Promesse du template rendu par dust.js
    let defer = Q.defer();
    dust.render(data, args,
      function(err, out){
        if(err)
          return defer.reject(err);
        defer.resolve(out);
    });
    return defer.promise;
}


//var render = renderTemplate(mail_path, mail_profile).then(console.log).catch(console.log);

const sendmail = require('sendmail')({silent:false});

module.exports = {
    sendMail: function(to, subject, text){
        let defer = Q.defer();

        sendmail({
            from: 'bot@ethermediary.com',
            to: to,
            replyTo: 'bot@ethermediary.com',
            subject: subject,
            text: text
        },
        (err, reply) => {
            if(err)
                return defer.reject(err);
            return defer.resolve(reply);
        });

        return defer.promise;
    }

}
