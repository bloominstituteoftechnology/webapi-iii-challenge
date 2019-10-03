const Users = require('../../../users/userDb.js');

function validateUserId(req, res, next) {
    const id = req.params.id;
    Users.getById(id)
    .then(user => {
        if (user) {
            req.user = user
            next();    
        } else {
            res.status(400).json({errorMessage: "No user exists by that ID"})
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
};

module.exports = validateUserId;