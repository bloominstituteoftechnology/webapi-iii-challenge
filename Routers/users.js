const express = require("express");
const users = express.Router();

const db = require("../data/helpers/userDb");
const routerFactory = require("./routerFactory");

routerFactory(users, db, 500, "Can not get users");

// Add ligic for "db.getUserPosts"

module.exports = users;

