const router = require('express')();
const Post = require('../data/helpers/postDb');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.get();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: 'Error getting posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.get(id);
    res.status(200).json({ post });
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving post' });
  }
});

router.get('/:id/tags', async (req, res) => {
  const { id } = req.parms;

  try {
    const tags = await Post.getPostTags(id);
    res.status(200).json({ tags });
  } catch (err) {
    res.status(400).json({ error: 'Error fethcing tags' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPost = { ...req.body };
  try {
    const count = await Post.update(id, updatedPost);
    if (count > 0) {
      res.status(200).json({ success: 'Post successfully updated' });
    } else throw Error();
  } catch (err) {
    res.status(400).json({ error: 'Error updating post' });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Post.remove(id);
    if (count > 0) {
      res.status(200).json({ success: 'Post successfully deleted' });
    } else throw Error();
  } catch (err) {
    res.status(400).json({ error: 'Error deleting post' });
  }
});
router.post('/', async (req, res) => {
  const post = { ...req.body };

  try {
    const id = await Post.insert(post);
    res.status(201).json(id);
  } catch (err) {
    res.status(400).json({ error: 'Error creating post' });
  }
});

module.exports = router;
