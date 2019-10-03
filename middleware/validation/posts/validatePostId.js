const Posts = require('../../../posts/postDb.js');

function validatePostId(req, res, next) {
    const id = req.params.id;
    Posts.getById(id)
    .then(post => {
        if (post) {
            req.post = post
            next();    
        } else {
            res.status(404).json({errorMessage: "No user exists by that ID"})
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
};

module.exports = validatePostId;