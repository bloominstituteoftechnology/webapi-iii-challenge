const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

//middleware
// const upperCaseThat = require('../middleware/upperCaseThat');

//endpoints
router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log('the error is: ', error);
    res.status(500).json({ message: " error: 'The posts could not be retrieved'", error: error });
  }
});

router.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let foundPost = await postDb.get(id);
    {
      foundPost
        ? res.status(200).json(foundPost)
        : res.status(404).json({ error: 'The post with that ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be retrieved.' });
  }
});

router.post('/api/posts', async (req, res) => {
  const postData = req.body;
  console.log(req.body);
  if (!postData.text || !postData.userId) {
    res.status(400).json({ errorMessage: 'Please provide text for your post and/or and ID of the user.' });
  } else {
    try {
      const newPost = await postDb.insert(postData);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the post to the database. The error is ', error });
    }
  }
});

router.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(deletedPost => {
      deletedPost
        ? res.status(202).json({ message: 'Post removed' })
        : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed.' });
    });
});

router.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.text || !changes.userId) {
      res.status(400).json({ errorMessage: 'Please provide text for your post and/or the ID of the user.' });
    } else {
      const foundPost = await postDb.get(id);
      if (!foundPost) {
        res.status(404).json({ message: `error: The post with the specified ID does not exist.` });
      } else {
        const count = await postDb.update(id, changes);
        res.status(200).json({ message: `${count} posts updated` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be updated.' });
  }
});

module.exports = router;
