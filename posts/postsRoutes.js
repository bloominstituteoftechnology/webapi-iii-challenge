const express = require('express');
const postsDB = require('../data/helpers/postDb');
const router = express.Router();

const clickWatchLogger = require("../data/middleware/");

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};



module.exports = router;