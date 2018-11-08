const express = require('express')
const postDb = require('../../data/helpers/postDb.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get()
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({ error: 'no posts found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve posts' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await postDb.get(id)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ error: `post ${id} not found` })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve posts' })
  }
})

router.post('/', async (req, res) => {
  const { userId, text } = req.body

  if (!userId || !text) {
    res.status(400).json({ error: 'missing data for post' })
  } else {
    try {
      const newPostId = await postDb.insert({ userId, text })
      const newPost = await postDb.get(newPostId)
      res.status(201).json(newPost)
    } catch (error) {
      res.status(500).json({
        error: 'failed to save post to db'
      })
    }
  }
})

router.put('/:id', async (req, res) => {
  if (!postDb.get(req.params.id)) {
    res.status(404).json({ error: 'no post with that id' })
  } else if (!req.body.title || !req.body.contents) {
    res.status(400).json({ error: 'missing data for post' })
  } else {
    try {
      const count = await postDb.update(req.params.id, req.body)
      if (count) {
        const post = await postDb.get(req.params.id)
        res.status(200).json(post)
      } else {
        res.status(400).json({ error: 'failed to update post in db' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const post = await postDb.get(req.params.id)

  if (!post) {
    res.status(404).json({ error: 'post to delete not found' })
  } else {
    try {
      const count = await postDb.remove(req.params.id)
      if (count) {
        res.status(200).json(post)
      } else {
        res.status(400).json({ error: 'error deleting post' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

module.exports = router
