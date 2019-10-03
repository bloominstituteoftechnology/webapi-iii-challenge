const express = require("express");

const postRouter = express.Router();

postRouter.get("/", (req, res) => {});

postRouter.get("/:id", (req, res) => {});

postRouter.delete("/:id", (req, res) => {});

postRouter.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = postRouter;
