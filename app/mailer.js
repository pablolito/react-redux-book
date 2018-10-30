const nodemailer = require('nodemailer');
const conf = require('./conf');


module.exports = function (data, sendingCallback) {
    
    nodemailer.createTestAccount((err, account) => {
        
        let transporter = nodemailer.createTransport({
            host: conf.MAILER.SMTP,
            port: conf.MAILER.PORT,
            secure: true, 
            auth: {
                user: conf.MAILER.USER,
                pass: conf.MAILER.PASS
            }
        });

        
        let mailOptions = {
            from: '"Max" <test@book.com>',
            to: conf.MAILER.USER,
            subject: 'Test mailer',
            text: 'Test mailer',
            html: '<b>' + data.message + '</b>'
        };

    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                sendingCallback(false);
                //return console.log(error);
            }
            sendingCallback(true);
            
        });
    });
    
}