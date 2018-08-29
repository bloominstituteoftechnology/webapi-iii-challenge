const express = require('express');
const db = require('../data/helpers/userDb');
const router = express.Router();

function nameUppercaser(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

router
  .route('/')
  .get(async (req, res) => {
    try {
      let data = await db.get();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(nameUppercaser, async (req, res) => {
    if (!req.body.name)
      return res.status(400).json({ message: 'You need to provide a name!' });
    try {
      let data = await db.insert({ name: req.body.name });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      let data = await db.get(req.params.id);
      if (data) {
        return res.status(200).json(data);
      }
      res
        .status(404)
        .json({ message: "The user with the specified ID doesn't exist" });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(nameUppercaser, async (req, res) => {
    if (!req.body.name)
      return res.status(400).json({ message: 'You need to provide a name' });
    try {
      let data = await db.update(req.params.id, { name: req.body.name });
      if (data) {
        return res
          .status(200)
          .json({ message: `${data} record(s) updated successfully` });
      }
      res
        .status(404)
        .json({ message: "The user with specified id doesn't exist" });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      let count = await db.remove(req.params.id);
      if (count) {
        return res.status(200).json({ message: `${count} record(s) removed` });
      }
      return res
        .status(404)
        .json({ message: "The user with specified id doesn't exist" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
