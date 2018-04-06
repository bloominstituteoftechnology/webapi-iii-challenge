const express = require('express');

const router = express.Router()

const db = require('../helpers/userDb');

router.get('/', (req, res) => {

    db.get()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting users list ", error ));
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting user ", error ));
    })
})

router.get('/:id/posts', (req, res) => {
    const { id }  = req.params;

    db.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error pulling up posts ", error));
    })
})

router.post('/add', (req, res) => {
    const user = req.body;
      if (Object.keys(user).length <= 1) {             // check for single key, if empty object, then skip to missing key
        if (Object.keys(user).includes('name')) {       // check for correct key
          if (typeof user.name === 'string') {          // check for string type
            if (user.name.trim().length === 0) {        // check for empty string
              res.status(422)
              .json(console.error('Name field must not be empty!'));
            } else {
              db.insert(user)
              .then(user => {
                res.status(200).json(user);
              })
              .catch(error => {
                res.status(500).json(console.error( "Error posting ", error));
              })
            }
          } else {
            res.status(422).json(console.error(`The value of name should be a string, not ${Object.prototype.toString.call(user.name)}!`));
          }
        } else {
          res.status(422).json(console.error("Your JSON is missing the required 'name' key"));
        }
      } else {
        res.status(422).json(console.error('Your JSON has too many keys'));
      }
    });

router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const user = req.body;

    db.update(id, user)
    .then(updated => {
        res.status(200).json(updated);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error updating ", error));
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removed => {
        res.status(200).json(removed);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error deleting ", error));
    })
})

module.exports = router;
