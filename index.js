const express = require('express');
const server = express();
const cors = require('cors');
const Userdb = require('./data/helpers/userDb.js');

server.use(express.json(), cors() );

const validate = (req, res, next) => {
  if(!req.body.name) {
    next('u1');
  } else if (req.body.name.length > 128) {   
    next('u2');
  } else {
    next();
  }
}

const Uppercase = (req, res, next) => {
  let newName = req.body.name.toUpperCase();
  req.name = newName;
  next();
}

server.get('/', (req, res) => {
  Userdb.get()
    .then(response => {
      response.forEach(res => {
        res.name = res.name.toUpperCase();
      })
      res.status(200).json(response)
    })
    .catch(err => res.status(400).json({ error: "Could not retrieve users." }))
})

server.post('/', validate, Uppercase, (req, res) => {
  let { name } = req.body;
  const newUser = { name: req.name }
  Userdb.insert(newUser)
    .then(response => {
      const send = {
        ...response,
        ...newUser
      }
      res.status(201).json(send)

    })
    .catch(err => res.status(400).json({ error: "User already exists." }));
})


server.delete('/:id', (req, res) => {
  const { id } = req.params;
  Userdb.remove(id)
    .then(response => {
      if (!response) {
        res.status(404).json({ error: "No user with this id." })
      } else {
        res.status(200).json({ message: "Success!" })
      }
    })
    .catch(err => res.status(400).json({ error: "Bad request." }))
})


server.put('/:id', validate, Uppercase, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newUser = { name: req.name }
  Userdb.update(id, newUser)
    .then(response => {
      if (!response) {
        res.status(400).json({ error: "Wrong id was given" })
      } else {
        res.status(200).json({ message: "Success!" })
      }
    })
    .catch(err => res.status(400).json({ error: err }))
})


const errorHandle = (err, req, res, next) => {
  const errors = {
    u1: {
      title: "Require Name",
      description: "Name is required.",
      httpCode: 400
    },
    u2: {
      title: "Require Name",
      description: "Name is too long, needs to be less than 128 characters.",
      httpCode: 400
    }
  }

  const error = errors[err];
  res.status(error.httpCode).json(error);
}

server.use(errorHandle);

port = 7000;
server.listen(port, () => console.log(`---Ready to blog on ${port}---`));
