const express = require('express');

// const server = express(); //dont need cause of Router now

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');

router.use(express.json());

function allCapTheReq(req, res, next){
  req.body.name = req.body.name.toUpperCase();
  next();
}

router.get('/', (req, res) => {
  userDb.get().then(allUsers => {
    res.status(200).json(allUsers)
  })
});

router.get('/:id', (req, res) => {
  userDb.get(req.params.id).then(user => {
    res.status(200).json(user)
  })
});

router.post('/', allCapTheReq, (req, res) => {
  if (req.body.id){
    res.status(400).json({message: 'please remove id and submit again.'})
  } else if (req.body.name.length > 128) {
    res.status(400).json({message: 'please choose a shorter name and submit again.'})
  } else {
    userDb.insert(req.body)
    .then( newUserId => {
      res.status(201).json(newUserId)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
});

router.put('/:id', allCapTheReq, (req, res) => {
  userDb.update(req.params.id, req.body)
  .then( count => {
    res.status(201).json(count)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  console.log('remove user')
  userDb.remove(req.params.id)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});


module.exports = router;
