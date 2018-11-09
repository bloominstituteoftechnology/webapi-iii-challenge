

//== User Routing ==============================================================

//-- Dependencies --------------------------------
const api     = require('./route-api.js');
const database = require('../data/helpers/userDb.js');

//-- Configuration -------------------------------
let users = module.exports = api(database, {
    schemaValidator(body) {
        // Check for ill-formed request
        if(!body.name){
            return false;
        }
        // Construct data from request
        return {
            name: body.name.charAt(0).toUpperCase() + body.name.slice(1),
        };
    }
});

//-- Unique Route Handlers -----------------------
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
