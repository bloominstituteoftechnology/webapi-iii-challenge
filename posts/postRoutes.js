const express = require('express');

// const server = express(); //dont need cause of Router now

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

router.use(express.json());

function isValidUser(req, res, next){
  if(req.body.userId) {
    userDb.get().then(allUsers => {
        let filter = allUsers.filter(users => {
          return users.id == req.body.userId
        })
        if(filter[0]) {
          next();
        } else {
          res.status(401).json({message: "The included userId is not valid. Please include a vallid userId and try again."})
        }
      }).catch(err => {
        res.status(500).json({message: "There was an error validating userId"})
      })
  } else {
      res.status(400).json({message: "Please include a userId in your request"})
  }
}

router.get('/', (req, res) => {
  postDb.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
});

router.get('/:id', (req, res) => {
  postDb.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
});

router.post('/', isValidUser, (req, res) => {
  if (!req.body.text) {
    res.json(400).json({message: "Please add text and resubmit request"})
  } else if (req.body.id) {
    res.status(400).json({message: 'Please remove id and submit again. A new Id will be added automatically.'})
  } else {
    postDb.insert(req.body)
      .then(postId => {
        res.status(200).json(postId)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
});

router.put('/:id', (req, res) => {
  postDb.update(req.params.id, req.body)
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  postDb.remove(req.params.id)
  .then( newUserId => {
    res.status(200).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;
