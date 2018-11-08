const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

//middleware
const upperCaseThat = require('../middleware/upperCaseThat');

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

module.exports = router;
