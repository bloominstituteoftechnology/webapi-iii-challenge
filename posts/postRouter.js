const express = require('express');

const router = express.Router();
const postDb = require("../data/helpers/postDb.js");

router.get('/', (req, res) => {
    postDb.get()
    .then( posts =>
        res.status(200).json(posts))
    .catch( (error) => 
        res.status(500).json({ message: 'could not get posts', error })
    )
  });
  
  router.post('/add', (req, res) => {
    const newpost = req.body;
    console.log(newpost);

  postDb.insert(newpost)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add post', error })
  )
});

router.put('/edit/:id', (req, res) => {
    const {id} = req.params;
    const editpost = req.body;

  postDb.update(id, editpost)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add post', error })
  )
});

  router.delete('/delete/:id', (req, res) => {
      const {id} = req.params;

    postDb.remove(id)
    .then( count =>
        res.status(200).json(count))
    .catch( (error) => 
        res.status(500).json({ message: 'could not delete post', error })
    )
  });

  module.exports = router;