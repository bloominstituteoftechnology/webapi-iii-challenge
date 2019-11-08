const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userDb.getById(id);
    user
      ? (req.user = user)
      : res.status(400).json({ message: "Invalid user ID" });
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
  next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) return res.status(400).json({ message: "missing user data" });
  if (!name) return res.status(400).json({ message: "Missing required name field" });
  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) return res.status(400).json({ message: "Missing post data" });
  if (!text) return res.status(400).json({ message: "Missing required text field" });
  next();
}

module.exports = router;
