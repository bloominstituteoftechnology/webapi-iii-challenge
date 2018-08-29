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

module.exports = router;
