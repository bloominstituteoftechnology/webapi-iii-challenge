const express = require('express');
const server = express();
const users = require("./data/helpers/userDb.js");

server.use(express.json());

//middleware

function uppercase (req, res, next) {
    req.body.name = req.body.name.charAt().toUpperCase() + req.body.name.slice(1);  
    next();
}


// routes

server.get("/api/users", (req, res) => {
    users.get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ error: "The user information could not be retrieved." });
      });
  });

server.get("/api/users/:id", (req, res)=> {
      users.get(req.params.id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ error: "The user information could not be retrieved." });
      });
  })

server.post("/api/users", uppercase, (req, res)=> {
    if (req.body.name.length < 128){
    users.insert(req.body)
    .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ error: "The user information could not be posted." });
      });}
      else {
          res.status(401).json({error: "dats too long"})
      }
});

server.put("/api/users/:id", uppercase, (req, res) => {
    users.update(req.params.id, req.body)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error posting data" });
      });
  });
  
server.delete("/api/users/:id", (req, res) => {
    users.remove(req.params.id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error deleting data" });
      });
  });
  




server.listen(7000, ()=> console.log('~API chillin on 7k~'));