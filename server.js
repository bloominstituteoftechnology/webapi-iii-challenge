const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const tagDB = require('./data/helpers/tagDb');

const server = express();
// turn on express's body parser, using JSON data
server.use(express.json());
// turn on CORS
server.use(cors());
// security features, activated!
server.use(helmet());

const PORT = 8000;

server.get('/', (req, res) => {
  res.send('TADA!');
});

// display all users
server.get('/users', async (req, res) => {
  try {
    const response = await userDB.get();
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The users information could not be retrieved.' });
  }
});

// display an individual user
server.get('/users/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const response = await userDB.get(ID);
    if (typeof response === 'undefined')
      return res.status(404).json({ error: `No user with id:${ID} exists.` });
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `The user with id:${ID} could not be retrieved.` });
  }
});

// display all of an individual user's posts
server.get('/users/:id/posts', async (req, res) => {
  const ID = req.params.id;

  // make sure user exists
  try {
    const response = await userDB.get(ID);
    if (typeof response === 'undefined')
      return res.status(404).json({ error: `No user with id:${ID} exists.` });

    //exists, so get the posts
    try {
      const response = await userDB.getUserPosts(ID);
      if (response.length === 0)
        return res.status(200).json(`User id:${ID} has no posts.`);
      else return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: `The user with id:${ID} could not be retrieved.` });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: `The user with id:${ID} could not be retrieved.` });
  }
});

// display all posts
server.get('/posts', async (req, res) => {
  try {
    const response = await postDB.get();
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

// display an individual post
server.get('/posts/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const response = await postDB.get(ID);
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `The post with id:${ID} could not be retrieved.` });
  }
});

// display all tags
server.get('/tags', async (req, res) => {
  try {
    const response = await tagDB.get();
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The tags information could not be retrieved.' });
  }
});

// display an individual tag
server.get('/tags/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const response = await tagDB.get(ID);
    if (typeof response === 'undefined')
      res.status(404).json({ error: `No tag with id:${ID} exists` });
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `The tag with id:${ID} could not be retrieved.` });
  }
});

server.use((req, res) =>
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`),
);

server.listen(
  PORT,
  console.log(`Server listening on http://localhost:${PORT}\n`),
);
