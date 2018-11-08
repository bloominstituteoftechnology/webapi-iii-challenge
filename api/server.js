const express = require('express');
const db = require('../data/helpers/userDb.js');


const configureMiddleware = require('./middleware.js');

const server = express();

// middleware
configureMiddleware(server);


// Custom Middleware
const checkNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(404).json({message: 'Name must be included'});
    next();
  } else {
    next()
  }
}

// endpoint handlers

const getAllUsers = (req, res) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: `Internal server error. Could not get users`, error });
    });
}

const getUser = (req, res) => {
  db.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not get users`, error });
    });
}

const addUser = (req, res) => {
  process.stdout.write(req.body.name + '\n');
  const { name } = req.body;
  db.insert({ name })
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not add user`, error });
    });
}

const deleteUser = (req, res) => {
  db.remove(req.params.id)
    .then(usersDeleted => {
      if (usersDeleted > 0) {
        res.status(200).json(usersDeleted);
      } else {
        res.status(400).json({ message: `User not deleted because they do not exist`, usersDeleted});
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not delete user`, error });
    });

}

const updateUser = (req, res) => {
  if (req.body.name === undefined) {
    res.status(400).json({ errorMessage: "Please provide a name for a user." });
    return;
  }
  db.update(req.params.id, req.body)
    .then(usersUpdated => {
      if (usersUpdated > 0) {
        res.status(200).json({ message: `${usersUpdated} users updated`});
      } else {
        res.status(404).json({ message: 'error updating user', error})
      } 
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not update user`, error });
    });

}

const uppercaseName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next()
}

const getPostsOfUser = (req, res, next) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: `Could not find post of user with ${id}`, error });
    });
}

const echo = (req, res) => {
  res.status(201).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}
const userMW = [ uppercaseName ];

// endpoints

// bind user endpoints
server.get('/api/users', getAllUsers);
server.get('/api/users/:id', getUser);
server.post('/api/users', checkNameMiddleware, uppercaseName, addUser);
server.delete('/api/users/:id', deleteUser);
server.put('/api/users/:id', checkNameMiddleware, uppercaseName, updateUser);

server.get('/api/users/:id/posts', getPostsOfUser);


const posts_db = require('../data/helpers/postDb.js');


/*
 * getAllPosts
 * GET - /api/posts 	
 * Returns an array of all the post objects contained in the database.
 * 
  * */
const getAllPosts = (req, res, next) => {
  posts_db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The posts could not be retrieved." 
        });
    })
}

/* 
 * getPostById 
 *
 * GET - /api/posts/:id
 * Returns the post object with the specified id.
 * 
  * */
const getPostById = (req, res, next) => {
  posts_db.get(req.params.id)
    .then(post => {
      console.log(post)
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ 
          message: `The post with id: ${req.params.id} does not exist`
        });      
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: `The post with id: ${req.params.id} could not be retrieved.`
        });
    })
}

/*
 * deletePost
 * DELETE - /api/posts/:id
 * Removes the post with the specified id and returns the deleted post. 
 *
  * */
const deletePost =  async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordsDeleted = await posts_db.remove(id);
    if (recordsDeleted > 0) {
      res.status(200).json(recordsDeleted);
    } else {
      res.status(404).json({ 
        message: `Could not delete record because it does not exist`
      })
    }
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed", error })
  }
}

/*
 * addNewPost 
 *
 * POST - /api/posts  
 * Creates a post using the information sent inside the request body. 
 *
  * */
const addNewPost = (req, res, next) => {
  if (req.body.userId === undefined || req.body.text === undefined) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    return;
  }

  posts_db.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" });
    })
}

/*
 * updatePost
 *
 * Updates the post with the specified id using data from the request body. 
 * Returns the modified document, NOT the original.
 *
  * */
const updatePost = (req, res, next) => {
  if (req.body.text === undefined) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    return;
  }

  posts_db.update(req.params.id, req.body).then(count => {
    if (count > 0) {
      posts_db.get(req.params.id).then(post => {
        console.log(post, post.hasOwnProperty('length'), post.length > 0)
        if ((post.hasOwnProperty('length') && post.length > 0)) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: `The post with the specified ID ${req.params.id} does not exist.`
          })
        }
      });
    } else {
      res.status(404).json({
        message: `The post with the specified ID ${req.params.id} does not exist.`
      })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be modified." })
  })
}




// bind post endpoints
server.get('/api/posts', getAllPosts);
server.get('/api/posts/:id', getPostById);
server.post('/api/posts', addNewPost);
server.delete('/api/posts/:id', deletePost);
server.put('/api/posts/:id', updatePost);

module.exports = server;
