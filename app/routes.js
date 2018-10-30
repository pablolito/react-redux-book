

module.exports = function(app) {

    app.post('/api/contact', (req, res)=> {
        
        const sendingEmail = require('./mailer.js');
        
        sendingEmail(req.body, function(mailIsSending){
            if(mailIsSending){
                res.send("Message bien envoyé");
            }else{
                res.send("Une erreur s'est produite lors de l'envoi du message");
            }
            
        })
    
    })
}