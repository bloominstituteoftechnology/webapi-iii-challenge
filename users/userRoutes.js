//THIS FILE IS FOR ANY ROUTES RELATED TO USER

const express = require('express');

//CALL IN DATABASE FROM HERE
const db = require('../data/helpers/userDb');

// const server = express();
//instead of using usualy way ^^^
//use below for separating routes from server.js
const router = express.Router();


//USERS USERS USERS USERS BELOW

//routes will only care about
//URLs that begin with /apie/users

//CREATING USErS = POST
router.post('/', (req, res) => {
    const userInfo = req.body;
    console.log('user info', userInfo);

    db
      .insert(userInfo)
      .then(response => {
          res.status(201).json(response);
      })
    //   .catch(err => {
    //     if (err.errno === 19) {
    //       res.status(400).json({ msg: 'WRONG' });
    //     } else {
    //       res.status(500).json({ erro: err });
    //     }
    //   });
});

//GETTING USERS = GET
router.get('/', (req, res) => {
    db.get()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

//GETTING USER POSTS = GET
router.get('/:id', (req, res) => {
    const userId = req.params.id
    db.getUserPosts(userId)
      .then(users => {
//POSSIBLY ADD res MESSAGE IF NO USER FOUND
// if (users.length === 0) {
//     res.status(404).json({ message: 'user not found' });
//   } else {
//     res.json(users[0]);
//   }
// SOMETHING LIKE THIS ^^^
          res.json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

//DELETE USERS = DELETE
router.delete('/', (req, res) => {
    const { id } = req.query;
    let user;
    db
      .get(id)
      .then(foundUser => {
          user = { ...foundUser[0] };

    db
      .remove(id)
      .then(response => {
          res.status(200).json(user);
      });
      })

      .catch(err => {
          res.status(500).json({ error: err });
      })
});


//UPDATE USERS = PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    db
      .update(id, update)
      .then(count => {
          if (count > 0) {
              db.get(id).then(users => {
                  res.status(200).json(users[0]);
              });
          } else {
              res.status(404).json({ msg: 'user not found' });
          }
      })
      .catch(err => {
          res.status(500).json(err);
      });
});



module.export = router;
//THIS IS HOW WE EXPORT HERE ^^^