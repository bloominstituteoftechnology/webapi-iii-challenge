const express = require('express');

const users = require('../data/helpers/userDb.js');

const router = express.Router();

const {nameChecker} = require('../middleware/middleware');



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
  
  router.post('/', nameChecker, (req, res) => {
    users
      .insert(req.body.name)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        res.status(500).json({message: 'post error'});
      });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    users
      .get(id)
      .then(user => {
        if (user === 0) {
            res.status(500).json({message: 'no access'});
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({message: 'no access'});
      });
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