const db = require('../data/helpers/userDb.js');
module.exports = async (req, res, next) => {
   
    // next points to the next middleware/route handler in the queue
    
    try {
        req.body.name = req.body.name.toUpperCase();
        res.status(201)
        next();
    }
    catch (err) {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
      };//if you 'catch' an error as defined by status 500 - let the client know
      
      // continue to the next middleware 
  };
  