const express = require('express');
const helmet = require('helmet');
const post = require('./data/helpers/postDb.js');
const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');

const server = express()

server.listen(8000, () => console.log('API running on port 8000'))

// local middleware adds specific post to req.body
function getPost(req, res, next){

}
const SUCCESS = 200;
server.use(express.json())
server.use(helmet())

const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const INVALID_POST_ID = "INVALID_POST_ID"
const MISSING_TEXT_OR_ID = "MISSING_TEXT_OR_ID"
const INVALID_USER_ID = "INVALID_USER_ID"

// ******************************  Posts ********************************************

server.get('/posts', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const posts = await post.get()
        res.status(SUCCESS).json(posts)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

server.get('/posts/:id', async (req,res, next) => {
    let { id } = req.params
    let error = INVALID_POST_ID

    try{
        const postIn = await post.get(id)
        if(!postIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        res.status(SUCCESS).json(postIn)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

server.post('/posts', async (req, res, next) => {
    const { text, userId } = req.body
    let error = MISSING_TEXT_OR_ID

    try{
        if(!text || !userId){ throw Error() }   // throw if missing information
        error = INVALID_USER_ID               // update error 

        let userIn = await user.get(userId)     // Check that ID is valid
        if(!userIn){ throw Error() }            // update error

        const postOut = {...req.body}
        error = INTERNAL_SERVER_ERROR           

        const response = await post.insert(postOut)
        res.status(SUCCESS).json(response)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.put('/posts/:id', async (req, res, next) => {
    const updated = {...req.body}
    const { id } = req.params
    let error = INVALID_POST_ID           // set initial error code 

    try{
        let postIn = await post.get(id)
        if(!postIn){ throw Error() }        // throw if invalid user ID
        error = INTERNAL_SERVER_ERROR     // update error

        await post.update(id, updated); 
        res.status(SUCCESS).json(updated)
    }catch(err) {
        next({error: error, internalError: err.message})    }
})

server.delete('/posts/:id', async (req, res, next) => {
    const { id } = req.params
    let error = INVALID_POST_ID

    try{
        const postIn = await post.get(id)
        console.log(postIn)
        if(!postIn){ throw Error() }

        error = INTERNAL_SERVER_ERROR
        await post.remove(id)
        res.status(SUCCESS).json({"Removed": postIn})
        
    }catch(err){
        next({error: error, internalError: err.message})    }
})



// ******************************  Users ********************************************

server.get('/users', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const users = await user.get()
        res.status(SUCCESS).json(users)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.get('/users/:id', async (req, res, next) => {
    const { id } = req.params
    let error = INVALID_USER_ID

    try{
        const userIn = await user.get(id)
        if(!userIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        res.status(SUCCESS).json(userIn)

    }catch(err){
        next({error: error, internalError: err.message})    }
})






// ******************************  Tags ********************************************

server.get('/tags', async (req, res, next) => {
    try{
        const tags = await tag.get()
        res.status(SUCCESS).json(tags)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.use(( err, req, res, next ) => {
    switch(err.error) {
        case MISSING_TEXT_OR_ID:
            res.status(400).send({
                success: false,
                description: "Please include valid text and a valid ID of a user",
                internal_error: err.internalError 
            })
        case INVALID_USER_ID:
            res.status(400).send({
                success: false,
                description: "No user by that ID",
                internal_error: err.internalError
            })
        case INVALID_POST_ID:
            res.status(400).send({
                success: false,
                description: "No post by that ID",
                internal_error: err.internalError
            })
        case INTERNAL_SERVER_ERROR:
            res.status(400).send({
                success: false,
                description: "Internal Server Error",
                internal_error: err.internalError
            })
    }
})
