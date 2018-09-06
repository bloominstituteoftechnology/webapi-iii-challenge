const express = require('express');
const userDb = require('./data/helpers/userDb');
const router = express.Router();

const upercaseChecker = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    console.log(req.body.name);
    next();
  };

router.get("/", (req, res) => {
    userDb
      .get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "The USERS data could not be retrieved." });
      });
  });
  
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    userDb
      .get(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "The USER data could not be retrieved" });
      });
  });
  
  router.get("/:id/posts", (req, res) => {
    const id = req.params.id;
    userDb
      .getUserPosts(id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The USER POST data could not be retrieved" });
      });
  });
  
  router.post("/", upercaseChecker, (req, res) => {
    const userContents = req.body;
    console.log(req.body);
    //   if ()
    userDb
      .insert(userContents)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "Unable to create user" });
      });
  });
  
  router.put("/:id", (req, res) => {
    userDb
      .update(req.params.id, req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "Unable to PUT" });
      });
  });
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    userDb
      .remove(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "UNABLE TO DELETE" });
      });
  });

  module.exports = router