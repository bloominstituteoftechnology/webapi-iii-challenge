const express = require("express");
const posts = express.Router();

const db = require("../data/helpers/postDb");
const routerFactory = require("./routerFactory");

routerFactory(posts, db, 500, "Can not get posts");

module.exports = posts;

