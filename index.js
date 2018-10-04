const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const db = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const port = 5201;


const capitalize = (req, res, next) => {
  const newUserName = req.body.name.toUpperCase();
  req.name = newUserName;
  next();
};

const textRecognize = (req, res, next) => {
  const newText = req.body.text;
  req.text = newText
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
      db.get(user.id) // .get() needs an id
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



/*
          I gather each and every post

  - allPosts returns an array of objects
    > inside each array there is a:
      1. text
      2. userId
*/

server.get('/users/posts', (req, res) => {    

  postDb.get()
    .then(allPosts => {      
      if (allPosts.length === 0) {
        return res.status(404).send({ errorMessage: `User has no posts available.` })
      }
      console.log('=========I am all posts=========', allPosts);
      res.status(200).json(allPosts);
    })
    .catch(err => console.log(err));
});








/*
          I gather the speciic post (by Id)
  
  - eachPost returns a object
    > Inside the object is a :
      1. text
      2. postedBy (whoever made the post)
      3. tags (an array of tags)
*/

server.get('/users/posts/:id', (req, res) => {
  const { id } = req.params;

  postDb.get(id)
    .then(eachPost => {      
      if (eachPost === 0) {
        return res.status(404).json({ missingError: `No posts by this Id` });
      }
      console.log('eachPost ===============', eachPost);
      res.status(200).json(eachPost);
    })
    .catch(err => console.log(err));
});





server.post('/users/posts', (req, res) => {
  const { userId, text }  = req.body; 
  // acts as the post itself that we can pass in

  postDb.insert({userId, text})
    .then(response => {
      console.log('============ RESPONSE ============', response);
      res.json(response);
    })
    .catch(err => console.log(err));
});

server.delete('/users/posts/:id', (req, res) => {
  const { id } = req.params;

  postDb.remove(id)
    .then(removedPost => {
      res.status(200).json(removedPost)
    })
    .catch(err => console.log(err));
});