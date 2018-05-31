const express = require('express');
const router = express.Router();

const db = require('../data/helpers/userDb');

const error = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
}

/*************************
** GET: /:id **
*************************/
// get
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(data => {
      if (!data) {
        return error(res, 404, 'Sorry, could not find that user. Perhaps try another one?');
      }
      res.json(data)
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

// getUserPosts
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

module.exports = router;