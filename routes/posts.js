const express = require('express');
const db = require('../data/helpers/postDb');
const router = express.Router();

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
  .post(async (req, res) => {
    let { userId, text } = req.body;
    if (!userId || !text)
      return res.status(400).json({ message: 'Text  or userID is missing' });

    try {
      let data = await db.insert({ userId, text });
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
        .json({ message: 'The post with specified ID cannot be found.' });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    let { userId, text } = req.body;

    if (!userId || !text)
      return res.status(400).json({ message: 'Text  or userID is missing' });

    try {
      let count = await db.update(req.params.id, { userId, text });
      if (count) {
        return res.status(201).json({ message: `${count} record(s) updated` });
      }
      res
        .status(404)
        .json({ message: 'The post with specified ID cannot be found.' });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      let count = await db.remove(req.params.id);
      if (count) {
        return res.status(201).json({ message: `${count} record(s) deleted` });
      }
      res
        .status(404)
        .json({ message: 'The post with specified ID cannot be found.' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
