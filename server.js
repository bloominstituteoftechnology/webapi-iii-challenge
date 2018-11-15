const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const posts = require("./data/helpers/postDb");
const users = require("./data/helpers/userDb");
const port = 3000




//middleware

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({}));

//custom middleware

// const upperCase = (req, res, next) => {
//   req.body.name = req.body.name.toUpperCase();
//   next();
// };

//endpoints



// Get all users

server.get("/users", (req, res) => {
    users
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "The post info could not be received", err });
      });
  });


  // Get users by ID

  server.get("/users/:id", (req, res) => {
      const { id } = req.params;
      users
        .get(id)
        .then(users => {
            if (users) {
                res.status(200).json(users)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post info could not be received", err });
        });
  });


  // create a new user 

  server.post("/users",  (req, res) => {  
      const { name } = req.body;
    users
      .insert({ name })
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
         res.status(500).json({ message: "There was an error while saving the user to the database", err });
      })
  })

  // Delete a user

  server.delete("/users/:id", (req, res) => {
      users
       .remove(req.params.id)
       .then(count => {
           res.status(200).json(count)
       })
       .catch(err => {
           res.status(500).json({ message: "Error deleting the user", err })
       })
  })


// Update a user

server.put("/users/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
    users
     .update(id, changes)
     .then(user => {
         if (user) {
             res.status(200).json({  message: `${user} posts updated` })
         } else {
             res.status(404).json({ message: "User not found "})
         }
     })
     .catch(err => {
        res.status(500).json({ message: "error updating the user", err });
      });
})

//post endpoints


// Get all posts

  server.get("/posts", (req, res) => {
    posts
      .get()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: "The post info could not be received", err });
      });
  });


  // Get post by ID

  server.get("/posts/:id", (req, res) => {
    const { id } = req.params;
   posts
      .get(id)
      .then(posts => {
          if (posts) {
              res.status(200).json(posts)
          } else {
              res.status(404).json({ message: "The post with the specified ID does not exist" })
          }
      })
      .catch(err => {
          res.status(500).json({ message: "The post info could not be received", err });
      });
});


// Create a new post

server.post("/posts",  (req, res) => {  
    const { userId, text } = req.body;
  posts
    .insert({ userId, text })
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
       res.status(500).json({ message: "There was an error while saving the post to the database", err });
    })
})

// Update a post 

server.put("/posts/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
    posts
     .update(id, changes)
     .then(post => {
         if (post) {
             res.status(200).json({  message: `${post} posts updated` })
         } else {
             res.status(404).json({ message: "Post not found "})
         }
     })
     .catch(err => {
        res.status(500).json({ message: "error updating the post", err });
      });
})

// Delete a post

server.delete("/posts/:id", (req, res) => {
    posts
     .remove(req.params.id)
     .then(post => {
         res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting the post", err })
        })
    })
    
    
    
    
    server.listen(port, () => console.log(`Server listening on ${port}`));

























 





































