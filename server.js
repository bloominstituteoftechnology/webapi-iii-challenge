const express = require('express');

const users = require('./data/helpers/userDb');
//const posts = require('./data/helpers/postDb');

const server = express();

//local middleware
function capitalize (req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

server.use(express.json());

server.get('/users', (req, res) => {
    users.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The users information could not be retrieved." });
    });
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    users.get(id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {res.status(200).json(user)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

server.get('/users/:id/posts', (req, res) => {
    const id = req.params.id;
    users.getUserPosts(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "This user does not have any posts or this user does not exist." })
        } else {res.status(200).json(posts)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user posts could not be retrieved." });
    });
})

server.post('/users', capitalize, (req, res) => {
    const userData = req.body;
    users.insert(userData)
    .then(user => {
        if (!userData.name) {
            res.status(400).json({ error: "Please provide a name for this user." });
        } else {
            res.status(201).json(user);
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
  });

  server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users.remove(id)
      .then(count => {
          if (count) {
            res.status(200).json({ message: "The user was successfully deleted." });
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user could not be removed" })
        });
  })

  server.put('/users/:id', capitalize, (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    users.update(id, userData)
      .then(count => {
          if (count === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
          } else if (!userData.name) {
            res.status(400).json({ errorMessage: "Please provide a name for this user." });
          } else {
            res.status(200).json({ message: "The user was updated successfully." });
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user information could not be modified." })
    });
  })


server.listen(7000, () => console.log('API running on port 7000'));