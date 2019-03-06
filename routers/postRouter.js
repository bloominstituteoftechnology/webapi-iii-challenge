const express = require("express");
const db = require("../data/helpers/postDb.js");

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  res.status(200).json("you did it again");
});

module.exports = postRouter;
