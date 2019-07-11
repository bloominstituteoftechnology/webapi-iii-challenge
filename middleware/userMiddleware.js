const Users = require("../users/userDb");

module.exports = {
    validateUserId,
    validateUser,
    validatePost,
  };

  //custom middleware

async function validateUserId (req, res, next) {
    const userId = req.params.id;
    try {
        const currentUser = await Users.getById(userId);
        if(!userId || isNaN(parseInt(userId, 10)) || !currentUser){
            res.status(400).json({errorMessage: 'invalid user id'})
        }
        else {
            req.user = currentUser;
            next();
        }
    } catch (error) {
        res.status(500).json({errorMessage: 'terrible error'})
    }

};

function validateUser(req, res, next) {
    if(Object.keys(req.body) == 0){
        res.status(404).json({ errorMessage: "missing user data" });
    }
    else if(!req.body.name){
        res.status(400).json({ errorMessage: "missing required name field" });
    }
    else next();
};

function validatePost(req, res, next) {
    if(Object.keys(req.body) == 0){
        res.status(404).json({ errorMessage: "missing post data" });
    }
    else if(!req.body.text){
        res.status(400).json({ errorMessage: "missing required text field" });
    }
    else next();
};