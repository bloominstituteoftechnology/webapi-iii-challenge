const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb.js');
const upperCaser = require('../middlewares/middlewares.js').upperCaser;

router.route('/')