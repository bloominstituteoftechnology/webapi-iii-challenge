

//== API Routing ===============================================================

//-- Dependencies --------------------------------
const api     = require('./route-api.js');
const database = require('../data/helpers/postDb.js');

//-- Configuration -------------------------------
module.exports = api(database, {
    schemaValidator(body) {
        // Check for ill-formed request
        if(!body.text || !body.userId){
            return false;
        }
        // Construct data from request
        return {
            text  : body.text  ,
            userId: body.userId,
        };
    }
});
