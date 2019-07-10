const express = require("express");
const Posts = require("./postDb");
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({message: 'root end point for post'})
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;