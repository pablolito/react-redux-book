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
            html:
                `<table>
                <tr>
                    <td>
                        <b>Message de</b> : ${data.username}</td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Société</b> : ${data.company}
                    </td>
                </tr>
                <tr>
                    <td>
                        ${data.message}
                    </td>
                </tr>
            
            </table>`
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