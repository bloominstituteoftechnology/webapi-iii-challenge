const Users = require('../../../users/userDb');

function validatePost(req, res, next) {
    const body = req.body
    const {text} = req.body
    const {user_id} = req.body
    if (!body) {
        res.status(400).json({errorMessage: "Missing data in body of request"})
    } 
    else if (!text) {
        res.status(400).json({errorMessage: "Missing data: text"})
    }
    else if (!user_id) {
        res.status(400).json({errorMessage: "Missing data: user_id"})
    } else {
        Users.getById(user_id)
        .then(item => {
            if (!item) {
                res.status(404).json({errorMessage: "No user by that ID exists!"})
            } else {
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Error in the middleware", err})
        })
    }
};

module.exports = validatePost;