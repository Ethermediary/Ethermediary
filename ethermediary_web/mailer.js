////////////////////////////////////////////////////////////////////////////////
// This is a test section for the email rendering
// A few modification are necessary to link this renderer to the email sender

const dust = require('hoffman').dust;
const path = require('path');
const Q = require('q');
const mailTemplates = require("./mailTemplates.js");
const sendmail = require('sendmail')({silent:false});

mailTemplates.cacheTemplates();

module.exports = {
    /**
     * @param name name of the template file
     * @param templateArgs args for rendering the template, depends on the template
     */
    sendTemplate: function(name, templateArgs, to, subject){
        mailTemplates.renderTemplate(name, templateArgs)
        .then(text => {
            return module.exports.sendMail(to, subject, text);
        })
    },

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






/*
mail_path = path.join(__dirname, 'mail') + "/newDeal.dust";

function Profile(person,meta,amount,caution,buyer_address,seller_address,frozen_time) {
    this.person = person;
    this.meta = meta;
    this.amount = amount;
    this.caution = caution;
    this.buyer_address = buyer_address;
    this.seller_address = seller_address;
    this.frozen_time = frozen_time;
};

caution = 666 * 0.20;
var mail_profile = new Profile("Albert Einstein","Une tourte",666,caution,"0x5eF269666ad34eC7c03f49C20739f34FDc964356",
"0x5eF269666ad34eC7c03f49C20739f34FDc964356",365);

// Two keys need to be changed accordingly
// if (role == "isSeller"){ mail_profile.isSeller = "isSeller"; }
// else { mail_profile.isSeller = "isBuyer"; } //role = isBuyer
mail_profile.isBuyer = "isBuyer";// or isSeller
mail_profile.BuyerAskCancel = "BuyerAskCancel";// or SellerAskCancel

mail_profile.received = "https://ethermediary.com/idspecial";
mail_profile.cancel = "https://ethermediary.com/cancelrequest";
mail_profile.accept_deal = "https://ethermediary.com/acceptdeal";
*/