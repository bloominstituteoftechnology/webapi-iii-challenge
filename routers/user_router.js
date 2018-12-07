const express = require('express');
const userDB = require('../data/helpers/userDb');
const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  userDB
      .get()
      .then((users) => {
          res.json(users);
      })
      .catch(err => {
          res
          .status(500)
          .json({error: "The users could not be retrieved."})
      });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  userDB
      .get(id)
      .then(user => {
          if (user) {
              res.json(user);
          } else {
              res
                  .status(404)
                  .json({error: "The user with the specified ID does not exist."});
          }
      })
      .catch(err => {
          res
              .status(500)
              .json({message: "The user information could not be retrieved. "})
      })
  });

router.post('/', (req, res) => {
const newUser = req.body;
if (newUser.name) {
  userDB.insert(newUser)
  .then(idInfo => {
    userDB
      .get(idInfo.id)
      .then(user => {
        res
          .status(201)
          .json(user);
        })
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "There was an error while saving the user to the database"})
      })
} else {
  res
    .status(400)
    .json({message: "Provide the name of the new user to be added to the database."})
}
});

router.delete('/:id', (req, res) => {
const { id } = req.params;
userDB
  .remove(id)
  .then(count => {
    if (count) {
      res
        .json({message: "User successfully deleted."})
    } else {
      res
        .status(404)
        .json({message: "The user with the specified ID does not exist."})
    }
  })
  .catch(err => {
    res
      .status(500)
      .json({message: "The user could not be removed."})
  })
});

router.put('/:id', (req, res) => {
const editUser = req.body;
const {id} = req.params;
if (editUser) {
  userDB.update(id, editUser)
  .then(count => {
    if (count) {
      res
        .json({message: "The user was edited."});
    } else {
      res
        .status(404)
        .json({message: "The user with the specified ID does not exist."});
    }
  })
  .catch(err => {
    res
      .stats(500)
      .json({message: "The user information could not be updated."})
  })
} else {
  res
    .status(400)
    .json({message: "Provide user's new name!"})
}
})

// get user posts (or user's post)
// this doesn't give back correct error messages some of the time. Sometimes it's just an empty array.
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  userDB
      .getUserPosts(id)
      .then(posts => {
          if (posts.length > 0) {
              res.json(posts);
              // console.log(posts);
          } else {
              res
                  .status(404)
                  .json({message: "The user with the specified ID does not exist."});
          }
      })
      .catch(err => {
          res
              .status(500)
              .json({message: "The user's posts could not be retrieved."});
      })
  });

module.exports = router;