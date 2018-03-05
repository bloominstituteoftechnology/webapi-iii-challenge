const express = require("express");
const bodyParser = require("body-parser");


const server = express();
const PORT =  3030;
const STATUS_SUCCESS = 200;
const STATUS_ERROR = 413;

let counter = 3;
const pets = {
  1: "Rigby",
  2: "Tag",
  3: "Schatzi",
  4: "Riley"
};

server.get("/", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(pets);
  res.error(STATUS_ERROR);
});

server.get("/:id/", (req, res) => {
  const id = req.params.id;
  res.status(STATUS_SUCCESS);
  res.send(pets[id]);
  // res.error(STATUS_ERROR);
})



server.listen(PORT, (err) =>{
  if(err) {
    console.log("Error starting server");
} else {
    console.log("Server listening on port: ", PORT);
}});