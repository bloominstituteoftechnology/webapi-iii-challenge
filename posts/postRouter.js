const express = require('express');

const Posts = require("../posts/postDb.js");

const router = express.Router();



// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;