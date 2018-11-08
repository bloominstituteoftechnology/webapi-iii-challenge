const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    userDb.get().then(users => {
        console.log('\n*** user **', users);
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "The information of users could not be retrieved. "}))
})

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    userDb.get(userId)
    .then(user => {
        if (!user) {
            res.status(404).json({ error: "The user with this ID does not exist."})
        }
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "This user information could not be retrieved. "}))
})

router.post('/', (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser).then(userId => {
        const { id } = userId;
        userDb.get(id)
        .then(user => {
            if (!user) {
                res.status(400).json({ error: "Please provide name for this user." });
            }
            res.status(201).json(user);
         });
      })
      .catch(err => {
          res.status(500).json({ error: "This user could not be added."});
        })
    });

router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
      res.status(404).json({ message: "The user with this ID does not exist." });
    }
    userDb.remove(userId)
      .then(removedUser => {
        res.status(200).json(removedUser);
      })
      .catch(err => { res.status(500).json({ error: "This user could not be deleted."});
      });
  })

  router.put('/:userId', (req,res) => {
    if (!req.body) {
        res.status(400).json({ error: "Please provide title and contents for the post." })
    }
    const { userId } = req.params;
    const { name } = req.body;
    const newUser = { name };
    console.log(newUser);
    userDb.update(userId, newUser)
    .then( post => {
        console.log(post);
        res.status(200).json({ post, message: 'user updated' });
    })
    .catch(err => res.status(500).json({ error: "The post information could not be modified." }));
})



module.exports = router;