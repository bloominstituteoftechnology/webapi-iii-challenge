const express = require('express');
const router = express.Router();
const postDb = require('./data/helpers/postDb');

router.get('/', (req,res) => {
  postDb.get()
    .then((posts) => {
      console.log(posts);
    })
    .catch(err => {
      res.status(500).json({error: "error getting posts"})
    })
})





module.exports = router;