const express = require('express');
const postDb = require('../helpers/postDb');
const userDb = require('../helpers/userDb');

const router = express.Router();



router.get('/', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then( post => {
      res.status(200).json({post});
    })
    .catch( error => {
      res
        .status(500)
        .json({ message : "Could not retrieve post", error: error});
    });
});

router.get('/api/posts/:id', (req, res) => {
  const { userId } = req.params;
  postDb
    .get(userId)
    .then(posts => {
       res.status(200).json(posts) 
    })
    .catch( error => {
      res.status(500).json({ message: "Could not retrieve post info", error: error})
    })
})


router.delete('/api/post/:id', (req, res) => {
  const { id } = req.params
  postDb
    .remove(id)
    .then(count => {
      count
        ? res.status(200).json(count) 
        : res.status(404).json({ message: "The post with the specified ID does not exist."})
    })
    .catch( error => {
      res.status(500).json({ message: "The post could not be removed", error })
    })
})

module.exports = router;