////////////////////////////////////////////////////////////////////////////////
// This is a test section for the email rendering
// A few modification are necessary to link this renderer to the email sender

const dust = require('hoffman').dust
const path = require('path')
const Q = require('q')
const fs = require('fs')
const nodemailer = require('nodemailer')
const mailTemplates = require("./mailTemplates.js");


class Mailer{

    constructor(){
        // Load mail login/mdp from json in current directory (excluded from git)
        this.mailCredential = JSON.parse(fs.readFileSync("./mailCredential.json").toString())
        this.transporter = nodemailer.createTransport({
            host: 'SSL0.OVH.NET',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: this.mailCredential.mail,
                pass: this.mailCredential.mdp
            }
        })
    }

    /**
     * Load templates and return a promise
     */
    loadTemplate(){
      return new Promise((resolve, reject) => {
        mailTemplates.cacheTemplates().then(function(){ return resolve() })
      })
    }

    /**
     * @param name of the template file
     * @param templateArgs args for rendering the template, depends on the template
     */
    sendTemplate(name, templateArgs, to, subject){
        mailTemplates.renderTemplate(name, templateArgs)
        .then(text => {
            return module.exports.sendMail(to, subject, text)
        })
    }

    /**
     * @param to destination email
     * @param subject of the email
     * @param text is a string containing the body text
     */
    sendMail(to, subject, text){
        let defer = Q.defer()
        var mailOptions = {
            from: '"info@ethermediary.com" <info@ethermediary.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            //html: '<b>Hello world?</b>' // In case we want to use html
        }
        this.transporter.sendMail(mailOptions, (error, info) => {
            console.log("An email has been sent to " + to)
            if(err)
                return defer.reject(err)
            return defer.resolve(info)

        })
        return defer.promise
    }

}

module.exports = new Mailer()

////////////////////////////////////////////////////////////////////////////////

/*mail_path = path.join(__dirname, 'mail') + "/newDeal.dust"

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
if (role == "isSeller"){ mail_profile.isSeller = "isSeller"; }
else { mail_profile.isSeller = "isBuyer"; } //role = isBuyer
mail_profile.isBuyer = "isBuyer";// or isSeller
mail_profile.BuyerAskCancel = "BuyerAskCancel";// or SellerAskCancel

mail_profile.received = "https://ethermediary.com/idspecial";
mail_profile.cancel = "https://ethermediary.com/cancelrequest";
mail_profile.accept_deal = "https://ethermediary.com/acceptdeal";

console.log(" ");
console.log(mail_profile);
console.log(" ");

function renderTemplate(data, args){  //Promesse du template rendu par dust.js
    let defer = Q.defer();
    dust.render(data, args,
      function(err, out){
        if(err)
          return defer.reject(err);
        defer.resolve(out);
    });
    return defer.promise;
}*/

//var render = renderTemplate(mail_path, mail_profile).then(console.log).catch(console.log);
