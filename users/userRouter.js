const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();

//middleware

//endpoints

// /api/users/

router.get('/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    console.log('the eerror is: ', error);
    res.status(500).json({ message: " error: 'The users could not be retrieved'", error: error });
  }
});

module.exports = router;
