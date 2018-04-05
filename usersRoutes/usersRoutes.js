const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "The users information could not be retrieved." })
  });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  
  db.get(userId)
  .then(response => {
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "User with specified ID does not exist"})
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be retrieved, or doesn't exist" })
  });
});

router.get('/userposts/:userId', (req, res) => {
  const { userId } = req.params;
  
  db.getUserPosts(userId)
  .then(response => {
    if (response.length) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "This user haven't post anything yet."})
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user-post information could not be retrieved, or doesn't exist" })
  });
});

router.post('/', (req, res) => {
  const newUser = req.body;
  
  if (!newUser) {
    res.status(400).json({ errorMessage: "Please provide username to create new user." })
  }
  
  db.insert(newUser)
  .then(response => {
    
    db.get(response.id)
    .then(user => res.status(200).json(user))
    .catch(error => {
      res.status(500).json({ error: "There was an inner error while saving user to the database." })
    });
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving user to the database." })
  });
});

router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const name = req.body.name;
  
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide name to update." })
    return;
  }
  
  db.update(userId, req.body)
  .then(response => {
    if(response) {
      db.get(userId)
      .then(post => res.status(200).json(post));
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information cannot be modified." });
  });
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  let user;
  
  db.get(userId)
  .then(response => {
    user = { ...response }
    
    db.remove(userId)
    .then(response => {
      if (response) {
        res.status(200).json({ deleted: user });
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ innerError: "The user could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "The user with the specified ID does not exist." });
  });
  
});


module.exports = router;