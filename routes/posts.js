

//== Post Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');
const database = require('../data/helpers/postDb.js');

//-- Configuration -------------------------------
const posts = express.Router();
module.exports = posts;


//== Route Handlers ============================================================

//-- Get all Posts -------------------------------
posts.get('/', async function (request, response, next) {
    // Retrieve all posts from database, then send to user
    try{
        let posts = await database.get();
        response.status(200);
        response.json(posts);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The posts information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Get a Post by Id ----------------------------
posts.get('/:id', async function (request, response, next) {
    // Attempt to find post-data in database
    try{
        const postId = request.params.id;
        let postData = await database.get(postId);
        // Inform the user if the requested data was not found
        if(!postData){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(postData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The post information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Create a Post -------------------------------
posts.post('/', async function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.text || !request.body.userId){
        response.status(400);
        response.json({
            errorMessage: "Please provide text and userId for the post."
        });
        next();
        return;
    }
    // Construct data from request
    let postData = {
        text  : request.body.text  ,
        userId: request.body.userId,
    };
    // Insert new post into database
    try{
        const result = await database.insert(postData);
        const newPost = await database.get(result.id);
        response.status(201);
        response.json(newPost);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "There was an error while saving the post to the database"
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Delete a Post -------------------------------
posts.delete('/:id', async function (request, response, next) {
    // Attempt to remove identified post from database
    try{
        const postId = request.params.id;
        const success = await database.remove(postId);
        // Handle situations where specified post does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
        }
        // Respond successfully
        else{
            response.status(204);
            response.end();
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The post could not be removed",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Update a Post -------------------------------
posts.put('/:id', async function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.text || !request.body.userId){
        response.status(400);
        response.json({
            errorMessage: "Please provide text and userId for the post."
        });
        next();
        return;
    }
    // Construct data from request
    let postData = {
        text  : request.body.text  ,
        userId: request.body.userId,
    };
    // Attempt to updated post data in database
    try{
        const postId = request.params.id;
        const success = await database.update(postId, postData);
    // Handle situations where specified post does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The post with the specified ID does not exist.",
            });
        }
    // Inform of success
        else{
            const updatedPostData = await database.get(postId);
            response.status(200);
            response.json(updatedPostData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The post information could not be modified.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});
