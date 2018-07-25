const express = require('express');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => {
  res.send('Node Blog');
});

server.get('/api/users', async (req, res) => {
  try {
    const users = await userDb.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ error: 'The users information could not be retrieved.' })
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.'});
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send({ error: 'The user information could not be retrieved.' });
  }
});

server.post('/api/users', async (req, res) => {
  const { name } = req.body;
  console.log('req.body',req.body);
  if (!name) {
    res.status(400).send({ error: req.body });
    res.status(400).send({ error: 'Please provide a name for the user.' });
  }

  try {
    const added = await userDb.insert(req.body);
    const user = await userDb.get(added.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({ error: 'There was an error while saving the user to the database.' });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.' })
    } else {
      await userDb.remove(req.params.id)
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send({ error: 'The user could not be removed.' });
  }
});


server.put('/api/users/:id', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ error: 'Please provide name for the user.' })
    }
    let user = await userDb.get(req.params.id);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.' })
    } else {
      await userDb.update(req.params.id, req.body);
      user = await userDb.get(req.params.id);
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send({ error: 'The user information could not be modified.' });
  }
});


server.listen(8000, () => console.log(`\nAPI running on port 8000\n`));