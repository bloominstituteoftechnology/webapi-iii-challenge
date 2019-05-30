const express = require("express");
const usersdb = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    usersdb
    .getById(id)
    .then(user => {
        if (user) {
            res
            .status(200).json({
                user
            });
        } else {
            res
            .status(404).json({
                message: "Cannot find the user"
            });
        }
    })
    .catch(err => {
        res
        .status(500).json({
          error: err, message: 'The user information could not be retrieved.' });
   });
 }) 
 

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, validateUser, (req, res) => {});

//custom middleware

function validateUserId(req, res, next)
{
  const id = req.params.id;
 usersdb.getById(id)
 .then(user => {
     if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "Invalid User ID" });
  }
})
.catch(err => {
    res.status(500).json(err);
})
}

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({message: "missing user data"});
    } else
    if (!req.body.name) {
        res.status(400).json({message: "missing required name field"});
    } else {
        next()
    }
}

function validatePost(req, res, next) {}

module.exports = router;
