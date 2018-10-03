const express = require('express');

const port = 8000;
const dbUsers = require("./data/helpers/userDb.js");

const server = express();

const cors = require('cors');

server.use(cors());

server.use(express.json())

const upperCase = (req, res, next) => {
	req.name = req.body.name.toUpperCase();
	console.log(req.name);
	next();
};


    


//Get
server.get('/api/users', (req, res) =>{
    dbUsers.get().then(users => {
        res.json(users);
    }).catch(err => res.send(err))
});

//Post

  server.post('/api/users', upperCase , (req, res) => {  
    const newUser = { name: req.name };
    dbUsers.insert(newUser)
      .then(user => {
        res.status(201).json(user);
        dbUsers.get(user.id)
          .then(userName => res.status(200).json(userName))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
// Delete

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    dbUsers.remove(id)
      .then(removedUser => {
        res.status(200).json(removedUser);
      })
      .catch(err => console.error(err));
  });

  //Put
  server.put('/api/users/:id', upperCase ,(req, res) => {
    const { id } = req.params;
    const newUser = { name: req.name };
    // ALWAYS CHECK YOUR UPDATES AND RESPOND ACCORDINGLY, THIS ENDPOINT ISNT FINISHED
    dbUsers.update(id, newUser)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => console.error(err));
  });

  


  

server.listen(port, () => console.log(`API running on port ${port}`)); 