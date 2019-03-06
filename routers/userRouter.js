const express = require("express");
const db = require("../data/helpers/userDb");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).json("you did it");
});

module.exports = userRouter;
