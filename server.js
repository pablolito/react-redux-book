const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'client/build')));

require('./app/routes.js')(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(process.env.PORT || 3001);