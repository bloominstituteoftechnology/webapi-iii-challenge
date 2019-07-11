const Posts = require("../posts/postDb");

module.exports = {
    validatePostId,
  };

  // custom middleware

async function validatePostId (req, res, next) {
    const postId = req.params.id;
    const currentPost = await Posts.getById(postId);
    if(!postId || isNaN(parseInt(postId, 10)) || !currentPost){
        res.status(400).json({errorMessage: 'invalid post id'})
    }
    else {
        req.post = currentPost;
        next();
    }
};
