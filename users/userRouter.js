const express = require('express');

const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb.js');

router.use((req, res, next) => {
  console.log('>>>>>>  FROM_USERS_ROUTER  <<<<<<');
  next();
});

router.post('/', validateUser, async (req, res) => {
  const user = req.body;
  try {
    const userData = await userDb.insert(user);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ succuss: false, message: 'Error getting user' });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const { text } = req.body;
  const post = {
    text: text,
    user_id: req.user.id
  };
  try {
    const postData = await postDb.insert(post);
    res.status(200).json(postData);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting user's post" });
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await userDb.get();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting users' });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  try {
    const userData = await userDb.getById(req.user.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting user' });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const postData = await userDb.getUserPosts(req.user.id);
    res.status(200).json(postData);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting user's posts" });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const userData = await userDb.remove(req.user.id);
    res.status(204).json(userData);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

router.put(
  '/:id',
  validateUserId,
  validateUser,
  validatePost,
  async (req, res) => {
    const user = req.body;
    try {
      const userData = await userDb.update(req.user.id, user);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error saving user' });
    }
  }
);

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userDb.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: 'invalid user id' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error' });
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing required data' });
    } else if (!body.name) {
      res.status(400).json({ message: 'missing required text field' });
    }
    next();
  } catch (error) {
    res.status(500).json({ succuss: false, message: 'Error' });
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing post data' });
    } else if (!body.text) {
      res.status(400).json({ message: 'missing required text field' });
    }
    next();
  } catch (error) {
    res.status(500).json({ succuss: false, message: 'Error' });
  }
}

module.exports = router;
