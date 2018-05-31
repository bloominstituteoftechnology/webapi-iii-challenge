// Express Dependencies
const express = require('express');
const router = express.Router();
// User Database 
const db = require('../data/helpers/userDb.js');

/* --- User Routes --- */
router.post('/', (req, res) => {
  // Variables
  const { name } = req.body;
  // Operation
  console.log(name);
  db.insert({ name })
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
  db.get()
    .then(users => res.json(users))
    .catch(err => {
      console.log("'/api/users' GET error:",err);
      res.status(500).json({ error: "The users' information could not be retrieved" });
    });
});

router.get('/:id', (req, res) => {
  // Variables
  const id = req.params.id;
  // Operation
  db.get(id)
    .then(user => {
      if (user.length <= 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(500).json({ message: "The user's information could not be retrieved" }));
});

// router.delete('/:id', (req, res) => {
//   // Variables
//   const { id } = req.params;
//   // Operation
//   db.remove(id)
//     .then(count => {
//       if (count === 1) {
//         res.json({ message: "User successfully deleted." });
//       } else if ( count === 0) {
//         res.status(404).json({ message: "The user with the specified ID does not exist." });
//       } else {
//         res.status(500).json({ message: "Serious Database Error. Contact administrator."});
//       }
//     })
//     .catch(err => res.status(500).json({ error: "The user could not be removed" }));
// });

router.put('/:id', (req, res) => {
  // Variables
  const { id } = req.params;
  const { name } = req.body;
  console.log("'/api/users/:id' PUT userInfo:",name,"id:",id);
  // Operation
  db.update(id, { name })
    .then(count => {
      console.log("'/api/users/:id' PUT count",count);
      if (count === 1) {
        db.get(id)
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