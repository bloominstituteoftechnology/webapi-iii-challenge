const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const PORT = 3040;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
let idCounter = null;
let basses = 
[
    {
        "id": 0,
        "make": "Tobias",
        "model": "Toby",
        "strings": 5,
        "color": "Brown Sunburst",
        "purchaseLocation": "Bananas At Large, San Rafael",
        "purchasePrice": 850,
        "currentValue": 1500
       },
       {
        "id": 1,
        "make": "Fender",
        "model": "Jazz Bass",
        "strings": 4,
        "color": "Blue",
        "purchaseLocation": "Private",
        "purchasePrice": 300,
        "currentValue": 2300
       },
  {
    "id": 2,
    "make": "Padula",
    "model": "MVP-Buzz-5",
    "strings": 5,
    "color": "Brown Sunburst",
    "purchaseLocation": "Guitar Center Hollywood",
    "purchasePrice": 1800,
    "currentValue": 2800
  },
  {
    "id": 3,
    "make": "Hohner",
    "model": "",
    "strings": 4,
    "color": "",
    "purchaseLocation": "",
    "purchasePrice": 0,
    "currentValue": 0
  }
 ]
server.use((req, res, next) => {
    console.log("Request received, what about it? ", req);
    next();
});
server.use(bodyParser.json());



server.get("/", (req, res) => {
    if (req.query.make) {
      let bass = null; //declares empty variable for single item 
      Object.keys(basses).forEach((id => {
        if (basses[id] === req.query.make) {
          bass = id;
        };
      }));
      res.status(STATUS_SUCCESS);
      res.send(bass); // send the bass in question
    } else {
      res.status(STATUS_SUCCESS);
      res.send(basses); // or send all basses
    }
  });

  //QUERY REQUEST
server.get("/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(STATUS_SUCCESS);
  res.send(basses[id])
});

//POST request
server.post("/", (req, res) => {
  const {
    bass 
    }= req.body;

    idCounter++;
    basses[idCounter] = bass;
    res.status(STATUS_SUCCESS);
    res.send({ id: idCounter});
})


  //TELL THE SERVER TO LISTEN TO 'PORT'
  server.listen(PORT,(err) => {
    if(err) {
      console.log('There was an error starting the server: ${err}');
    } else {
      console.log('Server is listening on port ${PORT}');
    }
  });