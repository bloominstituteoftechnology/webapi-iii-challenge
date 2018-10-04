const express = require('express');
const db = require('../data/helpers/userDb.js');
const router = express.Router();
const msg = require('../errorMessages/errorsUsers.js');

// ========== Middleware for PUT and POST endpoints ==========

// Router-level middleware
router.post('/', function (req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
});

// router.put('/:id', function (req, res, next) {
//   req.body.name = req.body.name.toUpperCase();
//   next();
// });

// Custom middleware on function-by-function basis
const nameCheckMiddleware = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

// ========== endpoint for /api/users ==========

// GET Routes
router.get('/', (req, res) => {
  db
    .get()
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(500).json(msg.GET_ALL_ERR));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then((user) => user ? res.status(200).json(user) : res.status(404).json(msg.NOT_FOUND))
    .catch(() => res.status(500).json(msg.GET_ONE_ERR));
});
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  db
    .getUserPosts(id)
    .then((posts) => posts.length !== 0 ? res.status(200).json(posts) : res.status(204))
    .catch(() => res.status(500).json(msg.USER_POSTS_ERR));
});

// DELETE Routes
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then((records) => records > 0 ? res.status(200).json(msg.DELETE_MSG) : res.status(404).json(msg.NOT_FOUND))
    .catch(() => res.status(500).json(msg.DELETE_ERR));
});

// POST Routes
router.post('/', (req, res) => {
  const user = req.body;
  if (!user.name) res.status(400).json(msg.NO_NAME);
  if (user.name.length > 128) res.status(400).json(msg.CHAR_EXCEEDED);
  db
    .insert(user)
    .then(({ id }) => {
      db.get(id)
        .then(newUser => res.status(201).json(newUser))
        .catch(() => res.status(404).json(msg.NOT_FOUND));
    })
    .catch(() => res.status(500).json(msg.POST_ERR));
});
// PUT Routes
router.put('/:id', nameCheckMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  db
    .update(id, updatedUser)
    .then((records) => records > 0 ? res.status(200).json(msg.PUT_MSG) : res.status(404).json(msg.NOT_FOUND))
    .catch(() => res.status(500).json(msg.PUT_ERR));
});

module.exports = router;
