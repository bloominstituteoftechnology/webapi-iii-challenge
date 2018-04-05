const express = require('express');
const router = express.Router();

const tagDb = require('./data/helpers/tagDb.js');


router.get('/api/tags', (req, res) => {
    tagDb
      .get()
      .then(tags => res.json(tags))
      .catch(error =>
        res.status(500).json({
          error: 'There was an error while retrieving tags'
        })
      );
  });















module.exports = router;
