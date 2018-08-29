const express = require('express');
const db = require('../data/helpers/postDb');
const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    let data = await db.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
