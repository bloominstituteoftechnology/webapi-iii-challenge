const express = require('express')
const userDb = require('../../data/helpers/userDb.js')
const uppercaseName = require('../utils/uppercaseNameMiddleware.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await userDb.get()
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({ error: 'no users found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve users' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await userDb.get(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: `user ${id} not found` })
    }
  } catch (error) {
    res.status(500).json({ error: 'faild to retrieve user' })
  }
})

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id)
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({ error: 'no posts found for that user' })
    }
  } catch (error) {
    res.status(500).json({ error: 'db error' })
  }
})

router.post('/', uppercaseName, async (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400).json({ error: 'missing name' })
  } else {
    try {
      const newUserId = await userDb.insert(req.body)
      const newUser = await userDb.get(newUserId)
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({
        error: 'failed to save user to db'
      })
    }
  }
})

router.put('/:id', uppercaseName, async (req, res) => {
  const { name } = req.body

  if (!userDb.get(req.params.id)) {
    res.status(404).json({ error: 'no user with that id' })
  } else if (!name) {
    res.status(400).json({ error: 'missing name' })
  } else {
    try {
      const count = await userDb.update(req.params.id, { name })
      if (count) {
        const user = await userDb.get(req.params.id)
        res.status(200).json(user)
      } else {
        res.status(400).json({ error: 'failed to update user in db' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const user = await userDb.get(req.params.id)

  if (!user) {
    res.status(404).json({ error: 'user to delete not found' })
  } else {
    try {
      const count = await userDb.remove(req.params.id)
      if (count) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ error: 'error deleting user' })
      }
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
})

module.exports = router
