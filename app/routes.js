

module.exports = function(app) {

    app.post('/api/contact', (req, res)=> {
        
        const sendingEmail = require('./mailer.js');
        
        sendingEmail(req.body, function(mailIsSending){
            if(mailIsSending){
                res.send("Merci votre message a bien été envoyé");
            }
            
        })
    
    })
}