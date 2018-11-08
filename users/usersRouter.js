const express = require('express');

//database
const userDb = require('../data/helpers/userDb');

//router
const router = express.Router();

//custom middleware
const upperCase = (request, response, next) => {
    console.log(request.body.name.toUpperCase());
    request.body.name  =  request.body.name.toUpperCase();
    next();
};

//===== user Endpoints ======
//GET all users [/api/users]
router.get('/', (req, res) => {
    userDb.get()
    .then( users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({message: error})
    })
    
  });

  //GET users by :id [/api/users/:id]
  router.get('/:id', (req, res) => {
      const { id } = req.params;

      userDb.get(id) 
      .then(user => {
          console.log('GET user by id:', user)
          if (user) {
              res.status(200).json(user)
          } else {
              res.status(404).json({message: 'user Not Found'})
          }
      })
      .catch( error => {
          res.status(500).json({ message: error})
      })
  })

 //GET user's posts [/api/users/:id/posts]
 
 router.get('/:id/posts', (req, res) => {
     const { id } = req.params;

     userDb.getuserPosts(id)
     .then(posts => {
         res.status(200).json(posts);
     })
     .catch(error => {
         res.status(500).json({ message:error})
     })
 })

 //POST (create) new user [/api/users/]
 router.post('/', upperCase, (req, res) => {
    const user = req.body;
    const { name } = user;
    console.log('POST', user);
     if (!name) {
      res.status(400).json({ message: "Name required" })
    }
     userDb.insert(user)
      .then(newuser => {
        res.status(201).json(newuser);
      })
      .catch(error => {
        res.status(500).json({ message: error });
      })
  });

  //UPDATE user [/api/users/:id]
  router.put('/:id', upperCase, (req, res) => {
      const { id } = req.params;
      const user = req.body;

      userDb.update(id,user)
      .then (count => {
          if (count) {
              res.status(200).json({ message: `${count} user(s) updated`});
          } else {
              res.status(404).json({ message: 'user does not exist'})
          }
      })
      .catch(error => {
          res.status(500).json({ message: error})
      })
  })

 //DELETE user [/api/users/:id]
  router.delete('/:id', (req, res) => {
      const { id } = req.params;

      userDb.remove(id)
      .then(count => {
          if (count) {
              res.status(200).json({ message: `${count} user(s) deleted`})
          } else {
              res.status(404).json({ message: 'user does not exist'})
          }
      })
      .catch (error => {
          res.status(500).json ({ message: error})
      })
  })
module.exports = router;