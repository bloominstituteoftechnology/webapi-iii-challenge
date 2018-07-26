const express = require('express');
const helmet = require('helmet');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express()

server.listen(8000, () => console.log('API running on port 8000'))


const SUCCESS = 200;
server.use(express.json())
server.use(helmet())

const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const INVALID_POST_ID = "INVALID_POST_ID"
const MISSING_TEXT_OR_ID = "MISSING_TEXT_OR_ID"
const MISSING_NAME = "MISSING_NAME"
const MISSING_TAG = "MISSING_TAG"
const INVALID_USER_ID = "INVALID_USER_ID"
const INVALID_TAG_ID = "INVALID_TAG_ID"

// ******************************  MiddleWare ********************************************

// local middleware checks for specific post by ID and adds to req.postIn
// Use to confirm we have a valid post
const getPost = async (req, res, next) => {
    let { id } = req.params
    let error = INVALID_POST_ID
    
    try{
        const postIn = await postDb.get(id)
        if(!postIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.postIn = postIn  

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}
// Checks for user by ID and adds to req.userIn
// Use to confirm valid user
const getUser = async (req, res, next) => {
    const { userId } = req.body
    const { id } = req.params
    let error = INVALID_USER_ID

    try{
        const userIn = await userDb.get(userId || id)
        if(!userIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        req.userIn = userIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})    }
}

const getTag = async (req, res, next) => {
    let { id } = req.params
    let error = INVALID_TAG_ID
    
    try{
        const tagIn = await tagDb.get(id)
        if(!tagIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.tagIn = tagIn  

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}

// ******************************  Posts ********************************************

server.get('/api/posts', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const posts = await postDb.get()
        res.status(SUCCESS).json(posts)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

server.get('/api/posts/:id', getPost, (req,res, next) => {
    error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.postIn)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

server.post('/api/posts', getUser, async (req, res, next) => {
    // getUser has already validated we have a valid user
    const { text, userId } = req.body
    let error = MISSING_TEXT_OR_ID

    try{
        if(!text || !userId){ throw Error() }   // throw if missing information

        const postOut = {...req.body}
        error = INTERNAL_SERVER_ERROR           

        const response = await postDb.insert(postOut)
        res.status(SUCCESS).json(response)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.put('/api/posts/:id', getPost, async (req, res, next) => {
    try{
        const updated = {...req.body} 
        await postDb.update(req.params.id, updated); 
        res.status(SUCCESS).json(updated)
    }catch(err) {
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

server.delete('/api/posts/:id', getPost, async (req, res, next) => {
    try{
        await postDb.remove(req.params.id)
        res.status(SUCCESS).json({"Removed": req.postIn})
        
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})



// ******************************  Users ********************************************

server.get('/api/users', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const users = await userDb.get()
        res.status(SUCCESS).json(users)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.get('/api/users/:id', getUser, async (req, res, next) => {
    // getUser validates and assigns user to req.userIn
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.userIn)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.post('/api/users', async (req, res, next) => {
    const { name } = req.body
    let error = MISSING_NAME

    try{
        if( !name ){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        const newUser = {...req.body}
        await userDb.insert(newUser)
        res.status(SUCCESS).json(newUser)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.put('/api/users/:id', getUser, async (req, res, next) => {
    try{
        const updated = {...req.body}
        await userDb.update(req.params.id, updated)
        res.status(SUCCESS).json(updated)
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

server.delete('/api/users/:id', getUser, async (req, res, next) => {
    try{
        await userDb.remove(req.params.id)
        res.status(SUCCESS).json({"Removed": req.userIn})
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})



// ******************************  Tags ********************************************

server.get('/api/tags', async (req, res, next) => {
    try{
        const tags = await tagDb.get()
        res.status(SUCCESS).json(tags)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.get('/api/tags/:id', getTag, async (req, res, next) => {
    // getTag has already validated tag and assigned to req.tagIn
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.tagIn)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.post('/api/tags', async (req, res, next) => {
    const { tag } = req.body
    let error = MISSING_TAG

    try{
        if( !tag ){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        const newTag = {...req.body}
        await tagDb.insert(newTag)
        res.status(SUCCESS).json(newTag)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

server.put('/api/tags/:id', getTag, async (req, res, next) => {
    try{
        const updated = {...req.body}
        await tagDb.update(req.params.id, updated)
        res.status(SUCCESS).json(updated)
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})


// ******************************  Error Handler ********************************************

server.use(( err, req, res, next ) => {
    switch(err.error) {
        case MISSING_TEXT_OR_ID:
            res.status(400).send({
                success: false,
                description: "Please include valid text and a valid ID of a user",
                internal_error: err.internalError 
            })
        case MISSING_NAME:
            res.status(400).send({
                success: false,
                description: "Please include a valid name for a user",
                internal_error: err.internalError 
            })
        case MISSING_TAG:
            res.status(400).send({
                success: false,
                description: "Please include a valid tag",
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
        case INVALID_TAG_ID:
            res.status(400).send({
                success: false,
                description: "No tag by that ID",
                internal_error: err.internalError
            })
        case INTERNAL_SERVER_ERROR:
            res.status(500).send({
                success: false,
                description: "Internal Server Error",
                internal_error: err.internalError
            })
    }
})
