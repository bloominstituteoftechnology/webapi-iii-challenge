const express = require('express');
const server = express();
const Userdb = require('./data/helpers/userDb.js');

server.use(express.json());

const Uppercase = (req, res, next) => {
  if(!req.body.name) {
    next();
  }  else {
    let newName = req.body.name.toUpperCase();
    req.name = newName;
    next();
  }
}

server.get('/', (req, res) => {
  Userdb.get()
    .then(response => {
      response.forEach(res => {
        res.name = res.name.toUpperCase();
      })
      res.status(200).json(response)
    })
    .catch(err => res.status(400).json({error: "Could not retrieve users."}))
})

server.post('/', Uppercase, (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ error: "Need a user." })
  } else if(req.body.name.length > 129) {
    res.status(400).json({ error: "Too many characters in name. Needs to be less than 129."})
  } else {
    let { name } = req.body;
    const newUser = { name: req.name }
    console.log(newUser)
    Userdb.insert(newUser)
      .then(response => {
        const send = {
          ...response,
          ...newUser
        }
        res.status(201).json(send)
      
    })
    .catch(err => res.status(400).json({ error: "User already exists." }));
  }
})


server.delete('/:id', (req, res) => {
  const { id } = req.params;
  Userdb.remove(id)
    .then(response => {
      if(!response) {
        res.status(404).json({ error: "No user with this id." })
      } else {
        res.status(200).json({ message: "Success!"})
      }
    })
    .catch(err => res.status(400).json({ error: "Bad request." }))
})


server.put('/:id', Uppercase, (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ error: "Need a new user to update."})
  } else if(req.body.name.length > 129) {
    res.status(400).json({ error: "Too many characters in name. Needs to be less than 129."})
  } else {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name: req.name }
    Userdb.update(id, newUser)
      .then(response => {
        if(!response) {
          res.status(400).json({ error: "Wrong id was given"})
        } else {
          res.status(200).json({message: "Success!"})
        }
      })
      .catch(err => res.status(400).json({ error: err }))
  }
})

port = 7000;
server.listen(port, () => console.log(`---Ready to blog on ${port}---`));
