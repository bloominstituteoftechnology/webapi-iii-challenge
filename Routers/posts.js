const express = require('express');
const posts = express.Router();

const db = require('../data/helpers/postDb');
const routerFactory = require('./routerFactory');

posts.get('/tags/:postId', (req, res) => {
  const { postId } = req.params;
  db
    .getPostTags(postId)
    .then(response => {
      /**
       * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching the data form the Database.
       * */
      // return new Promise.reject();

      res.status(200).json(response);
    })
    .catch(e => {
      res
        .status(500)
        .json(
          'Oh, oh.... there is a problem bargain with the dababase, try again!'
        );
    });
});

routerFactory(posts, db, 500, 'Can not get posts');

module.exports = posts;
