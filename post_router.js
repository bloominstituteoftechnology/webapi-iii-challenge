const express = require('express');
const router = express.Router();
const postDb = require('./data/helpers/postDb');

router.get('/posts', (req,res) => {
  postDb.find()
    .then((posts) => {
      console.log(posts);
    })
})





module.exports = router;