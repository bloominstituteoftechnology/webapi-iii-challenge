const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

// Run Server

const server = express();

//imported helpers
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// Parse objects to json

server.use(express.json())


//security
server.use(helmet())

//logger 
server.use(morgan('dev'))

//Users

server.get('/users', async (req, res) => {
    try {
        const users = await userDb.get()
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json({error: "Users not found"})
    }
})

server.get('/users/:id', async(req, res) => {
    try {
        const id = req.params.id
        const userId = await userDb.getUserPosts(id)
        if (userId === undefined) {
           return res.status(404).json({error: "The user with that id can't be found"})
        }
        res.status(200).json(userId)
    } catch(err) {
        res.status(404).json({error: 'Users not found.'})
    }
})

server.post('/users', async (req, res) => {
     try {
         const { name } = req.body;
         if (name === undefined) {
          return res.status(404).json({error: "Name can't be found, please provide it"})
         }
        const Userpost = await userDb.insert({name})
        res.status(200).json(Userpost)
     } catch(err) {
        res.status(500).json({error: "There was an error while saving user to the database"})
     }
})

server.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body
        if (name === undefined) {
            res.status(400).send({error: "Name not found"})
        }
        const update = await userDb.update(id, {name}) 
        res.status(200).json(update)
    } catch(err) {
        res.status(500).json({error: "The user couldn't be modified"})
    }
})

server.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const remove = await userDb.remove(id)
        if (remove === 0 ) {
            res.status(404)
        }
        res.send(200).json(remove)
    } catch(err) {
        res.status(400).json({error: "The user couldn't be deleted"})
    }
})

// Posts 

server.get('/posts', async (req, res) => {
    try {
        const posts = await postDb.get()
        res.status(200).json(posts)
    } catch(err) {
        res.status(404).json({error: 'Post could not be found'})
    }
})


server.get('/posts/:id', async (req,res) => {
    try {
        const id = req.params.id
        const postTag = await postDb.getPostTags(id)
        res.status(200).json(postTag)
    } catch(err) {
        res.status(404).json({ error: 'The post with that id could not be found'})
    }
})

server.post('/posts/:id', async (req, res) => {
    try {
        const { userId, text } = req.body;
        if (userId === undefined || text === undefined) {
          return res.status(400).json({error: "UserId or text is missing"})
        }
        const post = await postDb.insert(req.body);
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json({error: "Error posting post"})
    }
})

server.put('/posts/:id', async (req, res) => {
    try {
        const { userId, text} = req.body
        if (userId === undefined || text === undefined) {
            return res.status(400).json({error: "UserId or text is missing"})
        }
        const update = await postDb.update(req.body)
        res.status(200).json(update)
    } catch(err) {
        res.status(500).json({error: "Error posting post"})
    }
})

server.delete('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const remove = await postDb.remove(id)
        if (remove === 0) {
            res.status(404)
        }
        res.status(200).json(remove)
    } catch(err) {
        res.status(400).json({error: "The post couldn't be deleted"})
    }
})


//tags

server.get('/tags', async (req, res) => {
    try {
        const getTags = await tagDb.get()
        res.status(200).json(getTags)
    } catch(err) {
        res.status(500).json({error: "The post information couldn't be retrieved"})
    }
})

server.post('/tags', async (req, res) => {
    try {
        const { tag } = req.body
        if ( tag === undefined) {
            res.status(400).json({error: "Please provide a name for the user"}) 
        }
        const tagInsert = await tagDb.insert({ tag })
    } catch(err) {
        res.status(500).json({ error: "There was an error saving the user to the database"})
    }
})

server.get('/tags/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getTagId = await tagDb.get(id)
        res.status(200).json(getTagId)
    } catch(err) {
        res.status(400).json({ error: "The tag with this Id doesn't exist"})
    }
})

server.put('/tags/:id', async (req, res) => {
    try {
        const { tag } = req.body
        const id = req.params.id
        const updateTag = await tagDb(id, { tag })
        res.send(200).json(updateTag)
    } catch(err) {
        res.status(400)
    }   
})

server.delete('tags/:id', async (req, res) => {
    try {
        const id = req.params.id
        if(removeTag === 0) {
            res.status(404)
        }
        const removeTag = await tagDb.remove(id)
        res.status(200).json(removeTag)
    } catch(err) {
        res.status(500).json({ error: "The post couldn't be removed"})
    }
})
server.listen(8000);