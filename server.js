const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const PORT = 3040;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
let idCounter = 0;
let basses = 
[
    {
        "id": 0,
        "Make": "Tobias",
        "Model": "Toby",
        "Strings": 5,
        "Color": "Brown Sunburst",
        "PurchaseLocation": "Bananas At Large, San Rafael",
        "PurchasePrice": 850,
        "CurrentValue": 1500
       },
       {
        "id": 1,
        "Make": "Fender",
        "Model": "Jazz Bass",
        "Strings": 4,
        "Color": "Blue",
        "PurchaseLocation": "Private",
        "PurchasePrice": 300,
        "CurrentValue": 2300
       },
  {
    "id": 2,
    "Make": "Padula",
    "Model": "MVP-Buzz-5",
    "Strings": 5,
    "Color": "Brown Sunburst",
    "PurchaseLocation": "Guitar Center Hollywood",
    "PurchasePrice": 1800,
    "CurrentValue": 2800
  },
  {
    "id": 3,
    "Make": "Hohner",
    "Model": "",
    "Strings": 4,
    "Color": "",
    "PurchaseLocation": "",
    "PurchasePrice": 0,
    "CurrentValue": 0
  }
 ]
server.use((req, res, next) => {
    console.log("Request received, what about it? ", req);
    next();
});
server.use(bodyParser.json());
server.get("/", (req, res) => {
    if (req.query.name) {
      let bass = null;
      Object.keys(basses).forEach((id => {
        if (basses[id] === req.query.name) {
          bass = id;
        };
      }));
      res.status(STATUS_SUCCESS);
      res.send(bass);
    } else {
      res.status(STATUS_SUCCESS);
      res.send(basses);
    }
  });

  //TELL THE SERVER TO LISTEN TO 'PORT'
  server.listen(PORT,(err) => {
    if(err) {
      console.log('There was an error starting the server: ${err}');
    } else {
      console.log('Server is listening on port ${PORT}');
    }
  });