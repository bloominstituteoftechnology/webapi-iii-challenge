const express = require('express');

const postDB = require('./data/helpers/postDb');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res)=>{
    postDB.get()
    .then(posts=>{
        res.json(posts);
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'});
    })
});

module.exports = router;