const db_posts = require('../posts/postDb')

validatePostId = async (req, res, next) => {
    try {
        const post = await db_posts.getById(req.params.id)
        post
        ?   (req.post = post, next())
        :   res.status(404).json({message: 'invalid post id'})
    }
    catch (err) {
        res.status(500).json({error: `you'll need a better backend developer if you want a useful error message`})
    }
}

module.exports = validatePostId