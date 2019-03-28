const express = require('express');

const users = require('../data/helpers/userDb.js');

const router = express.Router();

const {nameChecker, toCap} = require('../middleware/middleware');



router.get('/', (req, res) => {
    users
      .get()
      .then(foundUsers => {
        res.json(foundUsers);
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });





  router.post('/', nameChecker, toCap, async (req, res) => {
    try {
      const user = await users.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    }
  });



  router.get('/:id', async (req, res) => {
    try {
      const id = await users.getById(req.params.id);
  
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: 'id not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the id',
      });
    }
  });


  

  
  router.get('/posts/:userId', (req, res) => {
    const { userId } = req.params;
    users
      .getUserPosts(userId)
      .then(usersPosts => {
        if (usersPosts === 0) {
            res.status(500).json({message: 'no access'});
        }
        res.json(usersPosts);
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users
      .remove(id)
      .then(userRemoved => {
        if (userRemoved === 0) {
            res.status(404).json({message: 'no access'});
        } else {
          res.json({ success: 'User Removed' });
        }
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });
  
  router.put('/:id', nameChecker, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
      .update(id, { name })
      .then(response => {
        if (response === 0) {
            res.status(404).json({message: 'no access'});
        } else {
          db.find(id).then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
  });
  

  module.exports = router;