const express = require('express');
const router = express.Router();
const userDb = require('./data/helpers/userDb');

//get -- user
router.get('/', (req, res) => {
    userDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})



router.get('/:id', (req, res) => {
  const id = req.params.id;

    userDb
    .getUserPosts(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- users
router.post('/', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json({ userInfo })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- users
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- user
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    userDb.update(id, user)
    .then(response => {
      if(response){
        res.status(200).json({ user })
      }else {
        res.status(404).json({Error: "no user with id"})
      }
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

module.exports = router;
