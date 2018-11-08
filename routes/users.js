

//== User Routing ==============================================================

//-- Dependencies --------------------------------
const express = require('express');
const database = require('../data/helpers/userDb.js');

//-- Configuration -------------------------------
const users = express.Router();
module.exports = users;

//-- Utilities -----------------------------------
function upperJustInCaser(request, response, next) {
    let name = request.body.name;
    if(name){
        name = name.charAt(0).toUpperCase() + name.slice(1);
        request.body.name = name;
    }
    next();
}


//== Route Handlers ============================================================

//-- Get all Users -------------------------------
users.get('/', async function (request, response, next) {
    // Retrieve all users from database, then send to user
    try{
        let users = await database.get();
        response.status(200);
        response.json(users);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The users information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Get a User by Id ----------------------------
users.get('/:id', async function (request, response, next) {
    // Attempt to find user-data in database
    try{
        const userId = request.params.id;
        let userData = await database.get(userId);
        // Inform the user if the requested data was not found
        if(!userData){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(userData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The user information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Create a User -------------------------------
users.post('/', upperJustInCaser, async function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.name){
        response.status(400);
        response.json({
            errorMessage: "Please provide a name for the user."
        });
        next();
        return;
    }
    // Construct data from request
    let userData = {
        name: request.body.name,
    };
    // Insert new user into database
    try{
        const result = await database.insert(userData);
        const newUser = await database.get(result.id);
        response.status(201);
        response.json(newUser);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "There was an error while saving the user to the database"
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Delete a User -------------------------------
users.delete('/:id', async function (request, response, next) {
    // Attempt to remove identified user from database
    try{
        const userId = request.params.id;
        const success = await database.remove(userId);
        // Handle situations where specified user does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
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
            error: "The user could not be removed",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Update a User -------------------------------
users.put('/:id', upperJustInCaser, async function (request, response, next) {
    // Check for ill-formed request
    if(!request.body.name){
        response.status(400);
        response.json({
            errorMessage: "Please provide a name for the user."
        });
        next();
        return;
    }
    // Construct data from request
    let userData = {
        name: request.body.name,
    };
    // Attempt to updated user data in database
    try{
        const userId = request.params.id;
        const success = await database.update(userId, userData);
    // Handle situations where specified user does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The user with the specified ID does not exist.",
            });
        }
    // Inform of success
        else{
            const updatedUserData = await database.get(userId);
            response.status(200);
            response.json(updatedUserData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The user information could not be modified.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//-- Get all Posts by User -----------------------
users.get('/:id/posts', async function (request, response, next) {
    const userId = request.params.id;
    // Retrieve all posts by a user from the database, then send to user
    try{
        let posts = await database.getUserPosts(userId);
        response.status(200);
        response.json(posts);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The user's posts could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});