const express = require('express');

const router = express.Router();
const userDb = require('../data/helpers/userDb');

// Middleware
router.use(express.json());

const capitalize = (req, res, next) => {
  console.log('capitalize');
  if (req.body.name) {
    req.name = req.body.name.toUpperCase();
    console.log(req.name);
  }
  next();
};

const checkName = (req, res, next) => {
  // console.log('checkName', req.body);
  if (!req.body.name || req.body.name.length > 128) {
    return res.status(400).send({
      errorMessage:
        'Please provide a name for the user that is less than 128 characters.',
    });
  }
  next();
};

// Routes
router.get('/', (req, res) => {
  userDb
    .get()
    .then((users) => {
      console.log('** users **\n', users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

router.post('/', checkName, capitalize, (req, res) => {
  console.log('req.body', req.body);
  const name = req.name;
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the user.',
    });
  }
  const newUser = { name };
  userDb.insert(newUser).then((userId) => {
    // console.log(userId);
    const { id } = userId;
    userDb
      .get(id)
      .then((user) => {
        // console.log(user);
        if (!user) {
          return res
            .status(422)
            .send({ Error: `User does not exist by id ${userId}` });
        }
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: 'The users information could not be saved.' });
      });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then((remove) => {
      console.log(remove);
      if (!remove) {
        return res.status(404).send({
          message: 'The user with the specified ID does not exist.',
        });
      }
      res.status(200).send({ message: `User with ID ${id} was removed.` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'The user could not be removed',
      });
    });
});

router.put('/:id', checkName, capitalize, (req, res) => {
  const { id } = req.params;
  const name = req.name;
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the user.',
    });
  }
  const newUser = { name };
  console.log('newUser', newUser);
  userDb
    .update(id, newUser)
    .then((user) => {
      console.log('user', user);
      if (!user) {
        return res.status(404).send({
          message: 'The user with the specified ID does not exist.',
        });
      }
      res.status(200).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'The user information could not be modified.',
      });
    });
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  userDb
    .getUserPosts(id)
    .then((userPosts) => {
      if (userPosts.length === 0) {
        res.status(404).json({ msg: 'Could not find posts by user' });
      } else {
        res.status(200).json(userPosts);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Error retrieving users posts.' });
    });
});

module.exports = router;
