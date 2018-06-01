const express = require('express');
const users = express.Router();

const db = require('../data/helpers/userDb');
const routerFactory = require('./routerFactory');

routerFactory(users, db, 500, 'Can not get users');

// Add logic for "db.getUserPosts"
users.get('/posts/:userId', (req, res) => {
  const { userId } = req.params;
  db
    .getUserPosts(userId)
    .then(response => {
      /**
       * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching the data form the Database.
       * */
      // return new Promise.reject();

      res.status(200).json(response);
    })
    .catch(e => {
      console.log('error', e);
      res
        .status(500)
        .json('Ups, something went wrong on our database, try again. ;-)');
    });
});

module.exports = users;
