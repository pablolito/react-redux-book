const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config({path:'./.env'});


const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./app/routes.js')(app);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});