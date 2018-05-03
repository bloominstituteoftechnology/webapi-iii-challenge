const express = require('express');
const userDb = require('./data/helpers/userDb.js');
// const tagDb = require('./data/helpers/tagDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

server.use(express.json());

//Homepage
server.get('/', (req, res) => {
    res.send('Anti-Homepage');
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
//============================================USER===========================================// userDb 
//User get all, get all of the users
  server.get('/users', (req, res) => {
    userDb.get().then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve user information!'});
        process.abort();
    })
});

// User get id, get the user of the specified id
server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .get(id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        } else {
            res.json(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be found'});
        process.abort();
    });
});

//User delete, delete user
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let user;
    userDb
        .get(id)
        .then(founduser => {
            user = { ...founduser };
            })
        userDb.remove(id).then (response => {
        if (id === 'undefined') {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        } else {
            res.status(200).json(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The user could not be removed.'});
        process.abort();
        })
});

//User update, update username
server.put('/users/:id', function(req, res) {
    const { id } = req.params;
    const update = req.body;
if (!update.name) {
    res.status(400).json({
      errorMessage: "Please the name for the user."
    });
  }
    userDb.update(id, update)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ msg: 'user updated successfully' })
        } else {
            res.status(404).json({ msg: 'user not found'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// User Post, create new user
server.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(400).json({
      errorMessage: "Please provide the name of the user!"
    });
  }
  userDb
    .insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database!"
      });
    });
});

// User get Posts, finds posts of a specific user
server.get('/users/:id/posts', (req, res) => {
  const id = req.params.id;
  userDb
  .getUserPosts(id)
  .then(posts => {
      if (posts.length === 0) {
          res.status(404).json({ message: 'That user does not have any posts'})
      } else {
          res.json(posts);
      }
})
  .catch(err => {
      res.status(500).json({error: 'The users posts could not be found'});
      process.abort();
  });
});

//=============================================Posts===========================================// postDb
//posts get all, get all posts of all users
server.get('/posts', (req, res) => {
  postDb.get().then(posts => {
      res.json(posts);
  })
  .catch(err => {
      res.status(500).json({error: 'could not retrieve post information!'});
      process.abort();
  })
});

// posts get id, get the post of the specified id
server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  postDb
  .get(id)
  .then(post => {
      if (post.length === 0) {
          res.status(404).json({ message: 'The post with the specified ID does not exist.'})
      } else {
          res.json(post);
      }
  })
  .catch(err => {
      res.status(500).json({error: 'The post information could not be found'});
      process.abort();
  });
});

//posts remove, delete a post based on it's ID ======Trying to resolve this... status 500****************
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params.id;
  let posts;
  postDb
      .get(id)
      .then(foundposts => {
          posts = { ...foundposts };
          })
      postDb.remove(id).then (response => {
      if (id === 'undefined') {
          res.status(404).json({ message: 'The post with specified ID could not be found'})
      } else {
          res.status(200).json(posts);
      }
  })
  .catch(err => {
      res.status(500).json({error: 'The post could not be removed.'});
      process.abort();
      })
});

// //update one post of a user
// server.put('/users/:id', function(req, res) {
//   const { id } = req.params;
//   const update = req.body;
// if (!update.name) {
//   res.status(400).json({
//     errorMessage: "Please the name for the user."
//   });
// }
//   userDb.update(id, update)
//   .then(count => {
//       if (count > 0) {
//           res.status(200).json({ msg: 'user updated successfully' })
//       } else {
//           res.status(404).json({ msg: 'user not found'});
//       }
//   })
//   .catch(err => {
//       res.status(500).json(err)
//   })
// });

// // dd a post to a user
// server.post("/users", (req, res) => {
// const newUser = req.body;
// if (!newUser.name) {
//   res.status(400).json({
//     errorMessage: "Please provide the name of the user!"
//   });
// }
// userDb
//   .insert(newUser)
//   .then(user => {
//     res.status(201).json(user);
//   })
//   .catch(err => {
//     res.status(500).json({
//       error: "There was an error while saving the user to the database!"
//     });
//   });
// });

// //get all tags off of a post