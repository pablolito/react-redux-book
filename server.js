const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('express-favicon');
require('dotenv').config({path:'./.env'});


const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(favicon(__dirname + 'client/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')));

require('./app/routes.js')(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(process.env.PORT || 3001);