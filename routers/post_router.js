const express = require('express');
const postDB = require('../data/helpers/postDb');
const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  res.json({ message: "hey, I'm here!"})
});



module.exports = router;