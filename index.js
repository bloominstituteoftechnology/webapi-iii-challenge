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
    let error = m.INTERNAL_SERVER_ERROR

    try{
        const posts = await post.get()
        res.status(m.SUCCESS).json(posts)
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message  })
    }
})

server.get('/posts/:id', async (req,res) => {
    let { id } = req.params
    let error = m.INVALID_POST_ID

    try{
        const postIn = await post.get(id)
        if(!postIn){ throw Error() }
        error = m.INTERNAL_SERVER_ERROR

        res.status(m.SUCCESS).json(postIn)
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})

server.post('/posts', async (req, res) => {
    const { text, userId } = req.body
    let error = m.MISSING_INFORMATION

    try{
        if(!text || !userId){ throw Error() }   // throw if missing information
        error = m.INVALID_USER_ID               // update error 

        let userIn = await user.get(userId)     // Check that ID is valid
        if(!userIn){ throw Error() }            // update error

        const postOut = {...req.body}
        error = m.INTERNAL_SERVER_ERROR           

        const response = await post.insert(postOut)
        res.status(m.SUCCESS).json(response)
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})

server.put('/posts/:id', async (req, res) => {
    const updated = {...req.body}
    const { id } = req.params
    let error = m.INVALID_POST_ID           // set initial error code 

    try{
        let postIn = await post.get(id)
        if(!postIn){ throw Error() }        // throw if invalid user ID
        error = m.INTERNAL_SERVER_ERROR     // update error

        await post.update(id, updated); 
        res.status(m.SUCCESS).json(updated)
    }catch(err) {
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})

server.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    let error = m.INVALID_POST_ID

    try{
        const postIn = await post.get(id)
        console.log(postIn)
        if(!postIn){ throw Error() }

        error = m.INTERNAL_SERVER_ERROR
        await post.remove(id)
        res.status(m.SUCCESS).json({"Removed": postIn})
        
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})



// ******************************  Users ********************************************

server.get('/users', async (req, res) => {
    let error = m.INTERNAL_SERVER_ERROR

    try{
        const users = await user.get()
        res.status(m.SUCCESS).json(users)
    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})

server.get('/users/:id', async (req, res) => {
    const { id } = req.params
    let error = m.INVALID_USER_ID

    try{
        const userIn = await user.get(id)
        if(!userIn){ throw Error() }
        error = m.INTERNAL_SERVER_ERROR

        res.status(m.SUCCESS).json(userIn)

    }catch(err){
        res.status(error.code).json({ "error": error.msg, "internal-error": err.message })
    }
})






// ******************************  Tags ********************************************

server.get('/tags', async (req, res) => {
    try{
        const tags = await tag.get()
        res.status(m.SUCCESS).json(tags)
    }catch(err){
        res.status(m.INTERNAL_SERVER_ERROR.code).json({ "error": m.INTERNAL_SERVER_ERROR.msg, "internal-error": err.message })
    }
})
