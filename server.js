const express = require('express');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');

function uppercaser(req, res, next) {
  const { tag } = req.body;
  if (tag) {
    req.body.tag = tag.charAt(0).toUpperCase() + tag.slice(1);
  }
  next();
}

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

/*==================
*
*   USERS
*
==================*/
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
  if (!name) {
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

server.get('/api/users/posts/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.'});
    } 
  } catch (err) {
    res.status(500).send({ error: 'The user information could not be retrieved.' });
  }

  try {
    const posts = await userDb.getUserPosts(req.params.id);
    if (posts.length === 0) {
      res.status(204).send({ error: 'This user has no posts.' })
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).send({ error: `The user's posts could not be retrieved.` });
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

/*==================
*
*   POSTS
*
==================*/
server.get('/api/posts', async (req, res) => {
  try {
    const posts = await postDb.getAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ error: 'The posts information could not be retrieved.' })
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.'});
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post information could not be retrieved.' });
  }
});

server.get('/api/posts/tags/:id', async (req, res) => {
  try {
    const tags = await postDb.getPostTags(req.params.id);
    if (tags.length === 0) {
      res.status(204).send({ error: 'This post has no tags.'});
    } else {
      res.status(200).json(tags);
    }
  } catch (err) {
    res.status(500).send({ error: 'The tags information for this post could not be retrieved.' });
  }
});

server.post('/api/posts', async (req, res) => {
  const { userId, text } = req.body;

  if (!text) {
    res.status(400).send({ error: 'Please provide text for the post.' });
  }

  try {
    const user = await userDb.get(userId);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.'});
    } 
  } catch (err) {
    res.status(400).send({ error: 'Please provide a user ID for the post.' });
  }

  try {
    const added = await postDb.insert(req.body);
    const post = await postDb.get(added.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send({ error: 'There was an error while saving the post to the database.' });
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.' })
    } else {
      await postDb.remove(req.params.id)
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post could not be removed.' });
  }
});

server.put('/api/posts/:id', async (req, res) => {
  const { userId, text } = req.body;

  if (!text) {
    res.status(400).send({ error: 'Please provide text for the post.' });
  }

  try {
    const user = await userDb.get(userId);
    if (user.length === 0) {
      res.status(404).send({ error: 'The user with the specified ID does not exist.'});
    } 
  } catch (err) {
    res.status(400).send({ error: 'Please provide a user ID for the post.' });
  }

  try {
    let post = await postDb.get(req.params.id);
    if (post.length === 0) {
      res.status(404).send({ error: 'The post with the specified ID does not exist.' })
    } else {
      await postDb.update(req.params.id, req.body);
      post = await postDb.get(req.params.id);
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).send({ error: 'The post information could not be modified.' });
  }
});

/*==================
*
*   TAGS
*
==================*/
server.get('/api/tags', async (req, res) => {
  try {
    const tags = await tagDb.getAll();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).send({ error: 'The tags information could not be retrieved.' })
  }
});

server.get('/api/tags/:id', async (req, res) => {
  try {
    const tag = await tagDb.get(req.params.id);
    if (tag.length === 0) {
      res.status(404).send({ error: 'The tag with the specified ID does not exist.'});
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).send({ error: 'The tag information could not be retrieved.' });
  }
});

server.post('/api/tags', uppercaser, async (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).send({ error: 'Please provide a value for the tag.' });
  }

  try {
    const added = await tagDb.insert(req.body);
    const tag = await tagDb.get(added.id);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).send({ error: 'There was an error while saving the tag to the database.' });
  }
});

server.delete('/api/tags/:id', async (req, res) => {
  try {
    const tag = await tagDb.get(req.params.id);
    if (tag.length === 0) {
      res.status(404).send({ error: 'The tag with the specified ID does not exist.' })
    } else {
      await tagDb.remove(req.params.id)
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).send({ error: 'The tag could not be removed.' });
  }
});

server.put('/api/tags/:id', async (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).send({ error: 'Please provide a value for the tag.' });
  }

  try {
    let tagObj = await tagDb.get(req.params.id);
    if (tagObj.length === 0) {
      res.status(404).send({ error: 'The tag with the specified ID does not exist.' })
    } else {
      await tagDb.update(req.params.id, req.body);
      tagObj = await tagDb.get(req.params.id);
      res.status(200).json(tagObj);
    }
  } catch (err) {
    res.status(500).send({ error: 'The tag information could not be modified.' });
  }
});


server.listen(8000, () => console.log(`\n==== API running on port 8000 ====\n`));