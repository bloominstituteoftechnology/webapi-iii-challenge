const express = require("express");
const tags = express.Router();

const db = require("../data/helpers/tagDb");
const routerFactory = require("./routerFactory");

routerFactory(tags, db, 500, "Can not get tags");

module.exports = tags;

