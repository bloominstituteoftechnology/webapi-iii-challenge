// Express Dependencies
const express = require('express');
const router = express.Router();
// User Database 
const userDb = require('../data/helpers/userDb.js');

/* --- '/api/users' Routes --- */
// POST
router.post('/', (req, res) => {
  const { name } = req.body;
  //==>
  console.log(name);
  userDb.insert({ name })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
      console.log("POST error:",err);
      if (err.errno === 19) {
        res.status(400).json({ errorMessage: "Please provide a unique for the user." });
      } else {
        res.status(500).json({ error: `There was an error while saving the user to the database\nError Message: ${err}` });
      }
    });
});

router.get('/', (req, res) => {
  //==>
  userDb.get()
    .then(users => res.json(users))
    .catch(err => {
      console.log("'/api/users' GET error:",err);
      res.status(500).json({ error: "The users' information could not be retrieved" });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  //==>
  userDb.get(id)
    .then(user => {
      if (user.length <= 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(500).json({ message: "The user's information could not be retrieved" }));
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  console.log(`'/:id/posts' ID: ${id}`);
  //==>
  userDb.getUserPosts(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ error: `No messages found for user ID ${id}.` });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(`'/:id/posts' GET error:`, error);
      res.status(500).json({ error: `Could not retrieve posts of user id ${id}.` });
    })
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Operation
  userDb.remove(id)
    .then(count => {
      if (count === 1) {
        res.json({ message: "User successfully deleted." });
      } else if ( count === 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(500).json({ message: "Serious Database Error. Contact administrator."});
      }
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  //==>
  console.log("'/api/users/:id' PUT userInfo:",name,"id:",id);
  userDb.update(id, { name })
    .then(count => {
      console.log("'/api/users/:id' PUT count",count);
      if (count === 1) {
        userDb.get(id)
          .then(user => res.json(user))
          .catch(err => res.status(500).json({ error: "User update successful, but could not retrieve record." }));
        } else if ( count === 0) {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
          res.status(500).json({ message: "Serious Database Error. Contact administrator."});
        }
    })
    .catch(err => {
      console.log("'/api/users/:id' PUT error:",err);
      if (err.errno === 19) {
        res.status(400).json({ errorMessage: "Please provide name for the user." });
      } else {
        res.status(500).json({ error: "The user information could not be modified." });
      }
  });
})

module.exports = router;