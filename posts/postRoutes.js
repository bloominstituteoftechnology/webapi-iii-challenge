const express = require('express');

// const server = express(); //dont need cause of Router now

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

router.use(express.json());

function isValidUser(req, res, next){
  userDb.get().then(allUsers => {
    let filter = allUsers.filter(users => {
      return users.id == req.body.userId
    })
    console.log(filter[0])
    if(filter[0]) {
      next();
    } else {
      res.status(403).json({message: "userId is not valid. Please try again."})
    }
  }).catch(err => {
    res.status(500).json({message: "error validating userId"})
  })
}


router.get('/', (req, res) => {
  console.log('posts requested')
  postDb.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
});

router.get('/:id', (req, res) => {
  console.log('id requested')
  postDb.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
});

router.post('/', isValidUser, (req, res) => {
  //userId is required from existing user
  // if Id present say it will be disgarded
// console.log('filter', filter)
  if (!req.body.text) {
    res.json(400).json({message: "please add text and resubmit request"})
  } else if (!req.body.userId) {
    res.json(400).json({message: "please include userId and resubmit request"})
  } else if (req.body.id){
    res.status(400).json({message: 'please remove id and submit again.'})
  } else {
    postDb.insert(req.body)
      .then(postId => {
        res.status(200).json(postId)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
});

router.put('/:id', (req, res) => {
  console.log('update post')
  postDb.update(req.params.id, req.body)
  .then(count => {
    res.status(201).json(count)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  console.log('remove post')
  postDb.remove(req.params.id)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;
