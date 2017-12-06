const sendmail = require('sendmail')({silent:false});
const Q = require('q');

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
