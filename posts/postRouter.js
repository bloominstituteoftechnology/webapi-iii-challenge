const express = require('express')
const router = express.Router()
const db_posts = require('./postDb')

router.get('/', async (req, res) => {
    try {
        const posts = await db_posts.get()
        posts.length > 0
        ?   res.status(200).json(posts)
        :   res.status(400).json({message: `No posts found`})
    }
    catch (err) {
        res.status(500).json({message: `Server broken, get posts yourself.`})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db_posts.getById(req.params.id)
        post
        ?   res.status(200).json(post)
        :   res.status(400).json({message: `No posts found for user`})
    }
    catch (err) {
        res.status(500).json({message: `Server broken, get user posts yourself.`})
    }
})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

module.exports = router;