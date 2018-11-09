const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// npm i express helmet morgan
// yarn add express helmet morgan

// const gatekeeper = require('../gatekeeper/gatekeeperMiddleware.js');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb')
const server = express();

// configure middleware
// ORDER MATTERS! they will execute top to bottom
server.use(express.json()); // built in
server.use(helmet()); // third party
server.use(morgan('short')); // third party

// custom

// server.use(gatekeeper); // using middleware globally

// configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

//can use as many middleware as desired before the homies.
// server.get('/secret', gatekeeper, (req, res) => { 
//   res.send(req.welcomeMessage);
// });

server.get( (req, res) => { 
  res.send(req.welcomeMessage);
});


// USERS: GET ALL
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the users", error: err });
    });
});

// USERS: GET BY ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.get(id)
    .then(user => {
      return user 
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'user not found' });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the user", error: err });
    });
});


// USERS: GET USER POSTS -- getUserPosts 

// USERS: POST -- insert
server.post('/api/users', async (req, res) => {
  console.log('body', req.body);
  try {
    const userData = req.body;
    const userId = await userDb.insert(userData);
    const user = await userDb.get(userId.id);
    res.status(201).json(user);
  } catch (error) {
    let message = 'error creating the user';

    if (error.errno === 19) {
      message = 'please provide both the name and the bio';
    }

    res.status(500).json({ message, error });
  }
});

// USERS: PUT -- update
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  userDb.update(id, changes)
    .then(count => {
      count 
      ? res.status(200).json({ message: `${count} user(s) updated`})
      : res.status(404).json({ message: 'user not found' })
    })
  
    .catch(err => {
    res.status(500).json({message: 'error updating the user'})
  })
})

// USER: DELETE -- remove
server.delete('/api/users/:id', (req, res) => {
  userDb.remove(req.params.id)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json({ message: "error deleting user" })
  })
})

// error !== exception
// throw new Error('reason')

/*
server.post('/api/users', (req, res) => {
  const userData = req.body;
  db.insert(req.body)
    .then(userId => {
      res.status(201).json(userId);
      db.getById(userId.id).then(user => {

      })
      .catch(err => {
        // error getting one user by id
      })
    })
    .catch(error => {
      res.status(500).json({ message: 'error creating user', error });
    });
});
*/

// server.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;
//   db.update(id, changes)
//     .then(count => {
//       if (count) {
//         res.status(200).json({ message: `${count} users updated` });
//       } else {
//         res.status(404).json({ message: 'user not found' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'error updating the user' });
//     });
// });

// server.delete('/api/users/:id', (req, res) => {
//   db.remove(req.params.id)
//     .then(count => {
//       res.status(200).json(count);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'error deleting user' });
//     });
// });

// server.get('/users', (req, res) => {
//   console.dir(req, { depth: 1 });
//   const { id } = req.query;

//   if (id) {
//     db.findById(id).then(users => res.send(users));
//   } else {
//     db.find().then(users => res.send(users));
//   }
// });

// POSTS: GET ALL
server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      return res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information can not be retrieved.",
        error: err })
    })
})

// POSTS: GET BY ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log('id:', id);
  postDb.get(id)
    .then(post => {
      console.log(post); // text: blah, postedBy: blah, tags: blah
      return post
      ? res.status(200).json(post)
      : res.status(404).json({ message: "The post with the specified ID does not exist."});
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information can not be retrieved.",
        error: err })
    })
})

/*
// import axios from 'axios'; ES2015 Modules
const express = require('express'); // CommonJS
// const bodyParser = require('body-parser');

const greeter = require('./greeter.js');
const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json()); // teaches express how to parse the JSON request body

server.get('/', (req, res) => {
  res.json('alive');
});

server.get('/greet', (req, res) => {
  res.json({ hello: 'stranger' });
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the users", error: err });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the user", error: err });
    });
});*/

server.post('/api/posts', async (req, res) => {
  console.log('body', req.body);
  try {
    const userData = req.body;
    const userId = await postDb.insert(userData);
    const user = await postDb.get(userId.id);
    // const user = await postDb.get(userId.id);
    res.status(201).json(user);
  } catch (error) {
    let message = 'error creating the user';

    if (error.errno === 19) {
      message = 'please provide both the name and the bio';
    }

    res.status(500).json({ message, error });
  }
});

// error !== exception
// throw new Error('reason')


// server.post('/api/users', (req, res) => {
//   const userData = req.body;
//   db.insert(req.body)
//     .then(userId => {
//       res.status(201).json(userId);
//       db.getById(userId.id).then(user => {

//       })
//       .catch(err => {
//         // error getting one user by id
//       })
//     })
//     .catch(error => {
//       res.status(500).json({ message: 'error creating user', error });
//     });
// });


server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating the user' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user' });
    });
});

// server.get('/users', (req, res) => {
//   console.dir(req, { depth: 1 });
//   const { id } = req.query;

//   if (id) {
//     db.findById(id).then(users => res.send(users));
//   } else {
//     db.find().then(users => res.send(users));
//   }
// });

// server.get('/greet/:person', greeter);

// google.com/search ? q = timer & tbs=qdr & tbo=1
// server.listen(9000, () => console.log('\n== the server is alive! ==\n'));

// http://localhost:9000/greet/carlos > { hello: 'carlos' }
// http://localhost:9000/greet/kevin > { hello: 'kevin' }
// http://localhost:9000/greet/chance > { hello: 'chance' }

// listen EADDRINUSE :::9000 < it means another server is running on that port






















module.exports = server;