const express = require('express');
const router = express.Router();
const userDB = require('./data/helpers/userDb');

router.get('/', (req, res) => {
  userDB.get()
    .then(users => {
      res.json(users)
        .catch(err => {
          res.status(500).json({ error: "problem loading users" })
        })
    })
})






module.exports = router;