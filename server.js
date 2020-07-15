import http from 'http';
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const logger = require('morgan');
import routes from './routes'


const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(logger('dev'));
app.use(express.static('uploads/'));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome 02KG boda boda app api end points" });
});

//routes
routes(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

