const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', async (req, res) => { // GET post
    try {
        const users = await postDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The posts information could not be retrieved.' })
    };
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const post = await postDb.get(id)
             post ? res.status(200).json(post): res.status(400).json({ message: "Unable to find post" })
        } catch(error) {
            res.status(500).json({ error: "couldn't retrieve post", error: error.message })
        }
})

router.post('/', async (req, res) => { // POST post
    const { userId, text } = req.body;
    if (!(userId || text))
        res.status(400).json({ message: 'Please provide userId and text.' })
    try {
        const { postId } = await postDb.insert({ userId, text });
        try {
            const post = await postDb.get(postId.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Could not create post.', res })
        }
    }   catch (error) {
        res.status(404).json({ Error: 'Unable to retrieve post.', res })
    }
});

router.put('/:id', async (req, res) => { // PUT post
    if (!req.body || !req.body.userId || !req.body.text)
      res.status(400).json({ message: 'Please provide user information!' })
    const {id} = req.params;
    const { userId, text } = req.body
    try {
      const user = await userDb.get(userId)
      if(!user)
        res.status(400).json({ message: 'Please provide proper userId.' })
      const updatePosts = await postDb.update(id, { userId, text })
      res.status(200).json({ id, userId, text })
    } catch(error) {
      res.status(500).json({ error: 'Unable to update post.', error: error.message })
      }
})

router.delete('/:id', async (req, res) => { // DELETE post
    const {id} = req.params.id
    try {
      const deletePosts = await postDb.remove(id)
      res.status(200).json({ message: 'Post successfully deleted!' })
    } catch(error) {
      res.status(500).json({ error: "Unable to delete post.", error: error.message})
    }
})

module.exports = router;