const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

require('./app/routes.js')(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(process.env.PORT, () =>{
  console.log("NODE_EN", process.env.NODE_ENV);
  console.log("PORT", process.env.PORT);
});