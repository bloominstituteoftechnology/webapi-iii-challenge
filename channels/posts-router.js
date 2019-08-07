const router = require('express').Router()

const posts = require('../posts/postDb')


// get posts by user

router.get('/:id', (req, res) => {
    const userId = req.params.userId
    
    posts.getById(userId)
        .then(post => {
            console.log('user post', post)
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error retrieving posts' })
        })
})

module.exports = router