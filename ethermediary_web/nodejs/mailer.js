const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    tls: {
        ciphers:'SSLv3',
       // rejectUnauthorized: false
    },
    debug:true,
    auth: {
        user: 'ethermediary@gmx.com',
        pass: 'broforce98'
    }
},
{
    from: "Ethermediary <ethermediary@gmx.com>"
});

module.exports = {
    sendMail: function(to, subject, text){
        var message = {
            to: to,
            subject: subject,
            text: text,
          //  html: '<p>HTML version of the message</p>'
        };
        
        console.log('Sending Mail');
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
            console.log('Server responded with "%s"', info.response);
            console.log(info);
        });
    }
}