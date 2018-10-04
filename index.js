const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const db = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const port = 5201;


const capitalize = (req, res, next) => {
  const { name } = req.body;
  req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
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

  db.insert(req.body)
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

  db.update(id, req.body)
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
        return res.status(404).send({ missingError: `User has no posts available.` })
      }
      console.log('=========I am all posts=========', allPosts);
      res.status(200).json(allPosts);
    })
    .catch(err => res.status(500).json({ simpleError: 'There was an error fetching' }));
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
      res.status(200).json(eachPost);
    })
    .catch(err => res.status(404).json({ fetchingError: 'This id does not exist' }));
});





server.post('/users/posts', (req, res) => {
  const { userId, text }  = req.body; 
  // acts as the post itself that we can pass in

  postDb.insert({userId, text})
    .then(response => {
      if (!req.body.text || !req.body.userId) {
        res.status(400).json({ fillError: 'Please provide text, and/or userId' })
      }      
      res.json(response);
    })
    .catch(err => res.status(500).json({ postError: 'There was an error posting' }));
});





server.delete('/users/posts/:id', (req, res) => {
  const { id } = req.params;

  postDb.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ missingError: 'err..... the id provided does not exist sowwy!' });
      } else if (response === 1) {
        res.status(200).json(response)
      }      
    })
    .catch(err => console.log(err));
});


server.put('/users/posts/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  postDb.update(id, { text })

    .then(response => {

      if (!req.body.text) {
        res.status(400).json({ fillError: 'Please provide an edit to the text' });
      } else if (response === 0) {
        res.status(404).json({ missingError: 'The post with the id you gave, does not exist' });
      } else if (response === 1) {
        res.status(200).json(response);
      }
                   
    })
    .catch(err => {
      res.status(500).json({ simpleError: 'There was an error updating' });
    });
});