const express = require('express');
const router = express.Router();

const db = require('../helpers/userDb');

router.get('/', (req, res) => {

    db.get()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting users list ', error ));
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting user ', error ));
    })
})



router.get('/:id/posts', (req, res) => {
    const { id }  = req.params;

    db.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(console.error(`Error getting posts. See error ${error}`));
    })
})

router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const user = req.body;

    db.update(id, user)
    .then(updated => {
        res.status(200).json(updated);
    })
    .catch(error => {
        res.status(500).json(console.error( `Could not update. Refer to ${error}`));
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removed => {
        res.status(200).json(removed);
    })
    .catch(error => {
        res.status(500).json(console.error(`Can not delete. Refer to ${error}`));
    })
})

router.post('/add', (req, res) => {
    const user = req.body;
    //We are checking for single entry, if empty, we skip to the entry that is missing.
      if (Object.keys(user).length <= 1) {
          //Checking for the correct entry              
        if (Object.keys(user).includes('name')) { 
            //Checking for the entry type      
          if (typeof user.name === 'string') {
              //Making sure the entry is not an empty string
            if (user.name.trim().length === 0) {
              res.status(422)
              .json(console.error('Name is required'));
            } else {
              db.insert(user)
              .then(user => {
                res.status(200).json(user);
              })
              .catch(error => {
                res.status(500).json(console.error( 'Can not post', error));
              })
            }
          } else {
            res.status(422).json(console.error(`The value of 'name' has to be a string, not ${Object.prototype.toString.call(user.name)}!`));
          }
        } else {
          res.status(422).json(console.error(`JSON is missing required 'name'`));
        }
      } else {
        res.status(422).json(console.error('JSON has too many attributes'));
      }
    });

module.exports = router;