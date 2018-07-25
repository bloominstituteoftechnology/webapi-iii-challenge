const express = require('express')
const morgan = require('morgan')
const userDb = require('./data/helpers/userDb')
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')

const server = express()

server.use(express.json())
server.use(morgan('tiny'))

server.post('/users', async (req, res) => {
  if (!req.body || !req.body.name)
    res.status(400).json({
      message: "you need to provide a name for the user"
    })

  const {
    name
  } = req.body

  try {
    const {
      id
    } = await userDb.insert({
      name
    })
    if (id) {
      res.status(200).json({
        id,
        name
      })
    }
  } catch (e) {
    res.status(500).json({
      error: "couldn't add user to db"
    })
  }
})

server.get('/users', async (req, res) => {
  try {
    const users = await userDb.get()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({
      error: "couldn't retrieve users"
    })
  }
})

server.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const user = await userDb.get(id)

    user ? res.status(200).json(user) :
      res.status(404).json({
        message: "user not found"
      })

  } catch (e) {
    res.status(500).json({
      error: "couldn't retrieve user"
    })
  }
})

server.put('/users/:id', async (req, res) => {
  if (!req.body || !req.body.name)
    res.status(400).json({
      message: "you need to provide a name for the user"
    })

  const id = Number(req.params.id)
  const {
    name
  } = req.body

  try {
    const numberOfUpdatedUsers = await userDb.update(id, {
      name
    })
    if (numberOfUpdatedUsers > 0)
      res.status(200).json({
        id,
        name
      })
  } catch (e) {
    res.status(500).json({
      error: "couldn't update user"
    })
  }
})

server.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const numberOfDeletedUsers = await userDb.remove(id)
    if (numberOfDeletedUsers > 0)
      res.status(200).json({
        message: "successfully deleted user"
      })
  } catch (e) {
    res.status(500).json({
      error: "couldn't delete user"
    })
  }
})

server.post('/posts', async (req, res) => {
  if (!req.body || !req.body.userId || !req.body.text)
    res.status(400).json({
      message: "you need to provide text and an existing userId"
    })

  const {
    userId,
    text
  } = req.body

  try {
    const user = await userDb.get(Number(req.body.userId))

    // if a valid user was found, a user object would be returned
    // an array of all users is returned if individual user wasn't found
    if (!user)
      res.status(400).json({
        message: "please provide a valid userID"
      })

    const {
      id
    } = await postDb.insert({
      userId,
      text
    })

    // this is also a short check to see if `id` has a truthy value
    id && res.status(200).json({
      id,
      userId,
      text
    })

  } catch (e) {
    res.status(500).json({
      message: "couldn't save post to db"
    })
  }

})

server.get('/posts', async (req, res) => {
  try {
    const posts = await postDb.get()
    res.status(200).json(posts)
  } catch (e) {
    res.status(500).json({
      message: "couldn't retrieve posts"
    })
  }
})

server.get('/posts/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const post = await postDb.get(id)

    post ? res.status(200).json(post)
         : res.status(400).json({ message: "couldn't find post" })

  } catch(e) {
    res.status(500).json({ error: "couldn't retrieve post", e: e.message })
  }
})


server.put('/posts/:id', async (req, res) => {
  if (!req.body || !req.body.userId || !req.body.text)
    res.status(400).json({ message: "please provide text and a userID" })

  const id = Number(req.params.id)
  const { userId, text } = req.body

  try {
    const user = await userDb.get(Number(userId))

    if(!user)
      res.status(400).json({ message: "please provide valid userId" })

    const numberOfUpdatedPosts = await postDb.update(id, { userId, text })
    
    res.status(200).json({ id, userId, text })

  } catch(e) {
    res.status(500).json({ error: "couldn't update post", e: e.message })
  }
})


server.delete('/posts/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
  
    const numberOfDeletedPosts = await postDb.remove(id)
    res.status(200).json({ message: `deleted post:${id}` })

  } catch(e) {
    res.status(500).json({ error: "couldn't delete post", e: e.message})
  }

})



server.listen(8080, () => console.log('💵:8080'))
