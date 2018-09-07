const express = require('express');
const router = express.Router();

const userDb = require('./data/helpers/userDb')
//api -> /users

//dummycheck

router.get('/', (req, res) => {
    res.send('connected')
});

module.exports = router;