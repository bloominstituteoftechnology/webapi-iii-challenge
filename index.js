// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

//IMPORTS FROM HELPERS FOLDER
const userDB = require('./data/helpers/userDB.js');
const postDB = require('./data/helpers/postDB.js');

//PORT
const port = 7000;

//SERVER INITIATED
const server = express();

//MIDDLEWARES
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger('combined'));

const upperCaps = (req, res, next) => {
    req.name = req.body.name.toUpperCase();
    next();
};

// ----- USERS -----
//ROUTES - GET Enpoint
server.get('/api/users', (req, res) => {
    userDB
        .get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({err: 'Could Not Retrieve Users'})
        })
  });

  server.get('/api/users/:id', (req, res) => {
      const {id} = req.params;
      userDB
        .get(id)
        .then(gotUser => {
            res.status(200).json(gotUser)
        })
        .catch(err => {
            res.status(500).json({err: `Could Not Retrieve User ${gotUser}`})
        })
  });

  //ROUTES - POST Endpoint
  server.post('/api/users', (req, res) => {
      const { name } = req.body;
      const newUser = { name };
    //   if (!name) {
    //       res.status(400).json({ error: 'No Name Provided' });
    //   }else{
        userDB
        .insert(newUser)
        .then(userId => {
            userDB
                .get(userId)
                .then(user => {
                    res.status(200).json(user)
                })
        })
        .catch(err => {
            res.status(500).json({err: `Could Not Create New User`})
        })
    //   }
  });

  //ROUTES - DELETE Endpoint
  server.delete('/api/users/:id', (req, res) => {
      const {id} = req.params
      userDB
        .remove(id)
        .then(removedUser => {
            if (removedUser === 1) {
                res.status(200).json(removedUser)
            }else {
                res.status(500).json({err: `User with Id${id} has Already been Removed`})
            }
        })
        .catch(err => {
            res.status(500).json({err: `Could Not Find User to be Removed`})
        })
  });
  
  //ROUTES - UPDATE Endpoint
  server.put('/api/users/:id', (req, res) => {
      const { id } = req.params
      const { name } = req.body
      const updatedUser = { name }
      userDB
        .update(id, updatedUser)
        .then(isUpdated => {
            res.status(200).json(isUpdated)
        })
        .catch(err => {
            res.status(500).json({err: `Could Not Update User ${existingUser}`})
            return; 
        })
  });

  // ----- POSTS -----
  //ROUTES - GET Endpoint
server.get('/api/posts', (req, res) => {
    postDB
        .get()
        .then(allPosts => {
            res.status(200).json(allPosts)
        })
        .catch(() => {
            res.status(500).json({err: "Could Not Retrieve Posts"})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params
    userDB
        .getUserPosts(id)
        .then(userPosts => {
            res.status(200).json(userPosts)
        }) 
        .catch(() => {
                res.status(500).json({err: `Could Not Retrieve Post(s)`})
        })
});

//ROUTES - POST Endpoint
server.post('/api/posts', (req, res) => {
    const {userId, text} = req.body
    const newPost = {userId, text}
    postDB
        .insert(newPost)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({err: `Could Not Add New Post`})
        })
})

//ROUTES - DELETE Endpoint
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params
    postDB
        .remove(id)
        .then(removedPost => {
            res.status(500).json(removedPost)
        })
        .catch(() => {
            res.status(500).json({err: `Could Not Delete Post`})
        })
})

//ROUTES - UPDATE Endpoint
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params
    const {userId, text} = req.body
    const updatedPost = {userId, text}
    postDB
        .update(id, updatedPost)
        .then(isUpdated => {
            res.status(200).json(isUpdated)
        })
        .catch(() => {
            res.status(500).json({err: `Could Not Update Post`})
        })
})



//LISTENER
server.listen(port, () => {
    console.log(`=== API LISTENING ON PORT ${port} ===`);
});
