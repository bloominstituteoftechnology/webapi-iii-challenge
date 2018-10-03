const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const db = require('./data/helpers/userDb');
const port = 5201;


const capitalize = (req, res, next) => {
  const newUserName = req.body.name.toUpperCase();
  req.name = newUserName;
  next();
};


server.use(cors()); // connects react
server.use(express.json()); 
server.use(logger('combined'));



server.listen(port, () => {
  console.log(`================Running on port ${port}==============`);
});




/*                        USERS                              */

server.get('/', (req, res) => {
  res.send('<h3>Welcome to INSTANT-GRAM!</h3>');
});

server.get('/users', (req, res) => {
  db.get()
    .then(users => {
      console.log(' I am users name: ', users);
      res.json(users);
    })
    .catch(err => res.send(err))
});








server.post('/users', capitalize, (req, res) => {  
  const newUser = { name: req.name };

  db.insert(newUser)
    .then(user => {
      // res.status(201).json(user);
      db.get(user.id)
        .then(userName => res.status(200).json(userName))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});










server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removedUser => {
      res.status(200).json(removedUser)
    })
    .catch(err => console.log(err));
  res.send(req.params);
});







server.put('/users/:id', capitalize, (req, res) => {
  const { id } = req.params;  

  const newUser = { name: req.name };
  db.update(id, newUser)
    .then(user => {      
      console.log(user, 'i am user inside put') // --> logs a 1 or 0      
      db.get(user.id) // get needs an id
        .then(userName => res.status(200).json(userName))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

/* ============================= END ====================== */

// if (!id) {
//   return res.status(404).send({ message: `The post with the specified ID does not exist.` })
// } else if (!name) {
//   return res.status(400).send({ errorMessage: "Please provide a name." })
// }







/*                           POSTS                          */

server.get('/users/:id', (req, res) => {
  const { id } = req.params;  

  db.getUserPosts(id)
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).send({ errorMessage: `User has no posts available.` })
      }
      res.status(200).json(posts);
    })
    .catch(err => console.log(err));
});