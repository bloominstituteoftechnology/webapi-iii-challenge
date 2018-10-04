const express = require('express');
const db = require('../data/helpers/userDb');
const router = express.Router();

const yell = (req, res, next) => {
    console.log(req.body.name);
    if(req.body.name) req.body.name = req.body.name.toUpperCase();
    
    next();
};

router.use(yell);

router.get('/', (req, res) => {
    db.get().then(users => {
        res.json(users);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(user => {
          if(!user) {
              return res.status(404).send({message: `no user with that id`});
          }
          console.log(user.name);
          res.json(user.name);
      })
      .catch(err => console.error(err))
});

router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    db.getUserPosts(userId)
      .then(posts => {
          if(!posts) {
              return res.status(404).send({message: `no posts`});
          }
          console.log(posts.text);
          res.json(posts);
      })
      .catch(err => console.error(err))
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    db.insert(newUser)
      .then(userId => {
          const { id } = userId;
        db.get(id)
          .then(user => {
              if(!user){
                  return res.status(400).send({errorMessage: "Please provide name for user"})
              }
              res.status(201).json(user)
          });
      }) 
      .catch(err => console.error(err))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(removeUser => {
         console.log(removeUser);
         res.status(200).json(removeUser);
      })
      .catch(err => console.error(err))
    res.send(req.params);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    db.update(id, newUser)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(err => console.error(err));
});


module.exports = router;