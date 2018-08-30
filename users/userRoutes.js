const express = require('express')
const userDb = require('../data/helpers/userDb')

const router = express.Router()

const upperCaseName = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase()
  }
  next()
}

router.get('/', async (req, res) => {
  const users = await userDb.get()
  res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const postsWrittenByUser = await userDb.getUserPosts(userId)
  res.status(200).json(postsWrittenByUser)
})

router.post('/', upperCaseName, async (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(500).json({ message: 'Error: missing JSON with name property' })
  } 

  const newUser = req.body
  const newId = await userDb.insert(newUser)
  const newUserWithId = { ...newUser, ...newId }
  res.status(200).json(newUserWithId)
})

router.put('/:id', async (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(500).json({ message: 'Error: missing JSON with name property' })
  } 

  const updateId = req.params.id
  const updateUser = req.body
  const count = await userDb.update(updateId, updateUser)

  if (count === 1) {
    res.status(200).json({ message: `Success: updated user with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update user with id ${req.params.id}` })
  }
})

router.delete('/:id', async (req, res) => {
  const deleteId = req.params.id
  const record = await userDb.remove(deleteId)
  if (record === 1) {
    res.status(200).json({ message: `Success: deleted user with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot delete user with id ${req.params.id}` })
  }
})

module.exports = router