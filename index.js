const express = require('express');
const helmet = require('helmet');
const post = require('./data/helpers/postDb.js');
const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');

const server = express()

server.listen(8000, () => console.log('API running on port 8000'))


server.use(express.json())
server.use(helmet())

const m = {
    SUCCESS: 200,
    MISSING_INFORMATION: {
        code: 400,
        msg: "Please include all required information"
    },
    INVALID_USER_ID: {
        code: 400,
        msg: "No User by that ID"
    },
    INVALID_POST_ID: {
        code: 400,
        msg: "No post by that ID"
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        msg: "Internal Server Error"
    }

}


// ******************************  Posts ********************************************

server.get('/posts', async (req, res) => {
    try{
        const posts = await post.get()
        res.status(m.SUCCESS).json(posts)
    }catch(err){
        res.status(m.INTERNAL_SERVER_ERROR.code).json({ "error": m.INTERNAL_SERVER_ERROR.msg, "e": err.message  })
    }
})

server.get('/posts/:id', async (req,res) => {
    let { id } = req.params
    try{
        const postIn = await post.get(id)
        res.status(m.SUCCESS).json(postIn)
    }catch(err){
        res.status(m.INVALID_POST_ID.code).json({ "error": m.INVALID_POST_ID.msg, "e": err.message })
    }
})

server.post('/posts', async (req, res) => {
    const { text, userId } = req.body
    let error = m.MISSING_INFORMATION

    try{
        if(!text || !userId){ throw Error() }   // Error is currently missing information, throw if missing information
        error = m.INVALID_USER_ID

        let userIn = await user.get(userId)     // Error is now invalid user error
        if(!userIn){ throw Error() }

        const postOut = {...req.body}
        error = m.INTERNAL_SERVER_ERROR           // ID checks out, change error to internal server error in case that goes wrong

        const response = await post.insert(postOut)
        res.status(m.SUCCESS).json(response)
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "e": err.message })
    }
})

server.put('/posts/:id', async (req, res) => {
    const updated = {...req.body}
    const { id } = req.params
    let error = m.INVALID_USER_ID

    try{
        let postIn = await post.get(id)
        if(!postIn){ throw Error() }

        error = m.INTERNAL_SERVER_ERROR     // If Id checks out, change error to server error
        await post.update(id, updated); 
        res.status(m.SUCCESS).json(updated)
    }catch(err) {
        res.status(error.code).json({ "error": error.msg, "e": err.message })
    }
})

server.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    let error = m.INVALID_USER_ID

    try{
        const postIn = await post.get(id)
        if(!postIn){ throw Error() }

        await post.remove(id)
        res.status(m.SUCCESS).json({"Removed": postIn})
        
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "e": err.message })
    }
})



// ******************************  Users ********************************************

server.get('/users', async (req, res) => {
    try{
        const users = await user.get()
        res.status(m.SUCCESS).json(users)
    }catch(err){
        res.status(500).json({ "error": "Problem retrieving users", "e": err.message })
    }
})






// ******************************  Tags ********************************************

server.get('/tags', async (req, res) => {
    try{
        const tags = await tag.get()
        res.status(m.SUCCESS).json(tags)
    }catch(err){
        res.status(500).json({ "error": "Problem retrieving tags", "e": err.message })
    }
})
