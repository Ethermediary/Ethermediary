// Email server setup and sender

const path = require("path");
const Q = require("q");
const nodemailer = require("nodemailer");
const mailTemplates = require("./mailTemplates.js");
const { exception } = require("console");

/** A class to connect to SMTP server and send emails  */
class Mailer {
  /** Use environment variable to load mail config */
  constructor() {
    if (
      process.env.MAIL_LOGIN == undefined ||
      process.env.MAIL_MDP == undefined ||
      process.env.MAIL_HOST == undefined
    ) {
      new Error("Mail server config is absent from env variables.");
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true, // true for 465, false otherwise
      auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_MDP,
      },
    });
  }

  /**
   * Load templates and return a promise
   */
  loadTemplates() {
    return mailTemplates.cacheTemplates();
  }

  /**
   * @param name of the template file
   * @param templateArgs args for rendering the template, depends on the template
   */
  sendTemplate(name, templateArgs, to, subject) {
    mailTemplates.renderTemplate(name, templateArgs).then((text) => {
      return module.exports.sendMail(to, subject, text);
    });
  }

  /**
   * @param to destination email
   * @param subject of the email
   * @param text is a string containing the body text
   */
  sendMail(to, subject, text) {
    let defer = Q.defer();
    var mailOptions = {
      from: '"info@ethermediary.com" <info@ethermediary.com>',
      to: to, // list of receivers
      subject: subject,
      text: text,
      //html: '<b>Hello world?</b>' // In case we want to use html
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      console.log("An email has been sent to " + to);
      if (err) return defer.reject(err);
      return defer.resolve(info);
    });
    return defer.promise;
  }
}

module.exports = new Mailer();
