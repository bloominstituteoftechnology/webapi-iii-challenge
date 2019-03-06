const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.use(express.json());


//test get
router.get('/', (req, res) => {
    res.status(200).send('Hello from Posts Router')
});

//get all posts by all users
router.get('/', async (req, res) => {
    try {

    } catch (e) {

    }
})

//get only posts from specific users

//post

//delete

//update

module.exports = router