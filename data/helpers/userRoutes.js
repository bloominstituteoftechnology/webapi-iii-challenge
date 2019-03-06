const express = require('express');
const postDB = require('./postDB.js');
const userDB = require('./userDb.js');
const router = express.Router();

function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

router.get('/', async (req, res) => {
  try {
    const users = await userDB.get(req.query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: 'Error'});
  }
});

router.get('/:id', async (req, res) => {
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

router.get('/posts/:id', async (req, res) => {
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

router.post('/', upperCase, async (req, res) => {
  try {
    const user = await usersDB.insert(req.body);
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json({message: 'Error'});
  }
});

router.put('/:id', async (req, res) => {
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
    
router.delete('/:id', async (req, res) => {
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

module.exports = router;