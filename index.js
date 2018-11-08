//all required
const express = require('express');
//const morgan = require('morgan');
//const cors = require('cors');

//database
const userdb = require('./data/helpers/userDb.js');
const postdb = require('./data/helpers/postDb.js');
const configureMiddleware = require('./config/middleware.js');


const server = express();
 
//inbuild middleware
/*server.use(express.json());
server.use(morgan('short'));
server.use(cors());*/

//custom middleware
const upperCase = (request, response, next) => {
    console.log(request.body.name.toUpperCase());
    request.body.name  =  request.body.name.toUpperCase();
    next();
};
 
//users get
server.get('/users', (request, response) => {
    userdb.get()
          .then(users => {
                response.status(200).json(users); 
           })
          .catch(error => {
                response.status(500).json({error : 'The users data could not be retrieved'})
           }) 
})

//users get
server.get('/users/:id', (request, response) => {
    userdb.get(request.params.id)
          .then(users => {
                response.status(200).json(users); 
           })
          .catch(error => {
                response.status(500).json({error : 'The users data could not be retrieved'})
           }) 
})

//users post
server.post('/users', upperCase, (request, response) => {
    if(request.body.name !== undefined) {
    userdb.insert(request.body)
          .then(userId => {
                response.status(201).json(userId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating user', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide name for the user." })
    }
}) 

//delete users
server.delete('/users/:id', (request, response) => {
    userdb.remove(request.params.id)
          .then(count => {
              response.status(200).json(count);
           })
          .catch(error => {
              response.status(500).json({message : 'error deleting user'})
           })
})

//users put
server.put('/users/:id', upperCase, (request, response) => {
    if(request.body.name !== undefined) {
        userdb.update(request.params.id, request.body)
              .then(count => {
                  if(count) {
                        response.status(200).json(count);
                  } else {
                        response.status(404).json({ message: "The user with the specified ID does not exist." })
                  }
               })
              .catch(error => {
                   response.status(500).json({ error: "The user information could not be modified." })
               })
    } else {
        response.status(400).json({ errorMessage: "Please provide name for the user." })
    }
})

//*********************************************************************** */
//posts get
server.get('/posts', (request, response) => {
    postdb.get()
          .then(posts => response.status(200).json(posts))
          .catch(error => response.status(500).json({error : 'The users data could not be retrieved'})) 
})

//posts get by id
server.get('/posts/:id', (request, response) => {
    postdb.get(request.params.id)
          .then(posts => response.status(200).json(posts))
          .catch(error => response.status(500).json({error : 'The users data could not be retrieved'})) 
})

// GET all posts by a specific user
server.get('/users/:id/posts', (request, response) => {
     console.log(request.params.id);
     userdb.getUserPosts(request.params.id)
           .then(posts => {
                if(posts.length < 1) {
                     response.status(200).json(`no post found for User ID : ${request.params.id}`)
                }
                response.status(200).json(posts);
            })
           .catch(error => response.status(500).json(error));
})

//posts post
server.post('/posts', (request, response) => {
    if(request.body.text !== undefined && request.body.userId !== undefined) {
    postdb.insert(request.body)
          .then(postId => {
                response.status(201).json(postId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating user', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide text and userId for the post." })
    }
}) 

//delete post
server.delete('/posts/:id', (request, response) => {
    postdb.remove(request.params.id)
          .then(count => {
              response.status(200).json(count);
           })
          .catch(error => {
              response.status(500).json({message : 'error deleting user'})
           })
})

//post put
server.put('/posts/:id', upperCase, (request, response) => {
    if(request.body.text !== undefined && request.body.userId !== undefined) {
        postdb.update(request.params.id, request.body)
              .then(count => {
                  if(count) {
                        response.status(200).json(count);
                  } else {
                        response.status(404).json({ message: "The user with the specified ID does not exist." })
                  }
               })
              .catch(error => {
                   response.status(500).json({ error: "The user information could not be modified." })
               })
    } else {
        response.status(400).json({ errorMessage: "Please provide name for the user." })
    }
})


server.listen(9000, () => {
     console.log("Server running on port 9000");
})