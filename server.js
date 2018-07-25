const express = require('express');
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

const usersNotRetrieved = "The users could not be retrieved.";
const userNotRetrieved = "The user could not be retrieved.";
const userNotFound = "The user with the specified ID does not exist.";
const missingName = "Please provide a name for this user."
const userSaveError = "There was an error while saving the user to the database";
const userDeleteError = "There was an error while deleting the user from the database";
const userEditError = "There was an error while saving the edited user to the database";

server.get('/api/users', async (req, res) => {
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: usersNotRetrieved });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await users.get(req.params.id);
    if (user === undefined) {
      res.status(404).json({ message: userNotFound });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: userNotRetrieved });
  }
});

server.post('/api/users', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ errorMessage: missingName });
  }
  try {
    const { id } = await users.insert(req.body);
    try {
      const newUser = await users.get(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ message: userNotFound });
    }
  } catch (error) {
    res.status(500).json({ error: userSaveError });
  }
});

server.put('/api/users/:id', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ errorMessage: missingName });
  }
  try {
    await users.update(req.params.id, req.body);
    try {
      const user = await users.get(req.params.id);
      if (user === undefined) {
        res.status(404).json({ message: userNotFound });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: userNotRetrieved });
    }
  } catch (error) {
    res.status(500).json({ message: userEditError });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await users.remove(req.params.id);
    if (user === 0) {
      return res.status(404).json({ message: userNotFound });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: userDeleteError });
  }
});

server.listen(8000, () => console.log('\n=== API running ===\n'));
