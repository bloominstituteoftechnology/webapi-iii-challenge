

//== API Routing ===============================================================

//-- Dependencies --------------------------------
const express = require('express');

//-- Configuration -------------------------------
module.exports = function(database, options){
    const validator = validateSchema(options.schemaValidator);
    const API = express.Router();
    API.get('/', getAll.bind(database))
    API.get('/:id', getById.bind(database))
    API.delete('/:id', deleteItem.bind(database))
    API.post('/', validator, create.bind(database))
    API.put('/:id', validator, updateItem.bind(database));
    return API;
}


//== Schema Validator Middleware ===============================================

function validateSchema(validator){
    return function (request, response, next){
        let validSchema = validator(request.body);
        if(!validSchema){
            response.status(400);
            response.json({
                errorMessage: "Provided data is invalid for this type of entry."
            });
            response.end();
            return;
        }
        request.body.entryData = validSchema;
        next();
    };
}


//== Route Handlers ============================================================

//-- Get all Posts -------------------------------
async function getAll(request, response, next) {
    // Retrieve all items from database, then send to user
    try{
        let items = await this.get();
        response.status(200);
        response.json(items);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item array could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Get a Post by Id ----------------------------
async function getById(request, response, next) {
    // Attempt to find item-data in database
    try{
        const itemId = request.params.id;
        let itemData = await this.get(itemId);
        // Inform the user if the requested data was not found
        if(!itemData){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(itemData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Create a Post -------------------------------
async function create(request, response, next) {
    // Get data from request
    let itemData = request.body.entryData;
    // Insert new item into database
    try{
        const result = await this.insert(itemData);
        const newPost = await this.get(result.id);
        response.status(201);
        response.json(newPost);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "There was an error while saving the item to the database"
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Delete a Post -------------------------------
async function deleteItem(request, response, next) {
    // Attempt to remove identified item from database
    try{
        const itemId = request.params.id;
        const success = await this.remove(itemId);
        // Handle situations where specified item does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
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
            error: "The item could not be removed",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Update a Post -------------------------------
async function updateItem(request, response, next) {
    // Get data from request
    let itemData = request.body.entryData;
    // Attempt to updated item data in database
    try{
        const itemId = request.params.id;
        const success = await this.update(itemId, itemData);
    // Handle situations where specified item does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
    // Inform of success
        else{
            const updatedPostData = await this.get(itemId);
            response.status(200);
            response.json(updatedPostData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item information could not be modified.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}
