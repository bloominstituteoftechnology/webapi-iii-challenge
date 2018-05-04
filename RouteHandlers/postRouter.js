const express = require('express');
const postDb = require('../data/helpers/postDb.js');


const router = express.Router();

router.use(express.json());


router.get('/', (req, res) => {
  postDb.get()
  .then(posts => {
    res.json(posts);
  })
})

// deleted users one and two so post id's one - nine are gone
router.get('/:id', (req, res) => {
  const {id} = req.params;
  postDb.get(id)
  .then(post => {
    res.json(post);
  })
})

router.post('/', (req, res) => {
  const post = req.body
  postDb.insert(post)
  .then(response => {
    postDb.get(response.id)
    .then(newPost => {
      res.json(newPost);
    })
  })
})

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const update = req.body;
  postDb.update(id, update)
  .then(response => {
    if (response){
      res.status(200).json({message: 'post successfully updated'});
    } else {
      res.status(418).json({error: 'nothing was updated'})
    }
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  postDb.get(id)
  .then( post => {
    postDb.remove(id)
    .then(() => {
      res.json(post);
    })
  })
})

module.exports = router;
