const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();

//middleware
const upperCaseThat = require('../middleware/upperCaseThat');

//endpoints
router.get('/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    console.log('the error is: ', error);
    res.status(500).json({ message: " error: 'The users could not be retrieved'", error: error });
  }
});

router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let foundUser = await userDb.get(id);
    {
      foundUser
        ? res.status(200).json(foundUser)
        : res.status(404).json({ error: 'The user with that ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The user could not be retrieved.' });
  }
});

router.post('/api/users', upperCaseThat, async (req, res) => {
  const userData = req.body;
  console.log(req.body);
  if (!userData.name) {
    res.status(400).json({ errorMessage: 'Please provide a name for your user' });
  } else {
    try {
      const newUser = await userDb.insert(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.log('the error was: ', error);
      res.status(500).json({ error: 'There was an error while saving the user to the database. The error is ', error });
    }
  }
});

router.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(deletedUser => {
      deletedUser
        ? res.status(202).json({ message: 'User removed' })
        : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed.' });
    });
});

router.put('/api/users/:id', upperCaseThat, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.name) {
      res.status(400).json({ errorMessage: 'Please provide a name for the user.' });
    } else {
      const foundUser = await userDb.get(id);
      if (!foundUser) {
        res.status(404).json({ message: `error: The user with the specified ID does not exist.` });
      } else {
        const count = await userDb.update(id, changes);
        res.status(200).json({ message: `${count} users updated` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'The user could not be updated.' });
  }
});

module.exports = router;
