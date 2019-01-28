const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path:'./.env'});


const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

//app.set("port", process.env.PORT || 3001);

// // Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use(express.static(path.join(__dirname, 'client/build')));

require('./app/routes.js')(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(process.env.PORT || 3001);