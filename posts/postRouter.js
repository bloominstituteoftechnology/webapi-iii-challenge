const express = require('express')
const router = express.Router()
const db_posts = require('./postDb')

const warez = require('../middleware')

//R
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

router.get('/:id', warez.validatePostId, async (req, res) => {
    try {
        //middleware validates the id
        //wait for db to send back post data, then pass it along to the client
        //look Carlos a somehwat useful comment!
        res.status(200).json(await db_posts.getById(req.params.id))
    }
    catch (err) {
        res.status(500).json({message: `Server broken, get posts yourself.`})
    }
})

//U
router.put('/:id', warez.validatePostId, async (req, res) => {
    try {
        await db_posts.update(req.params.id, req.body)
        ?   res.status(200).json({id: req.params.id, ...req.body})
        :   res.status(404).json({message: `Where in the world is Carmon SanYourpostgo?`})
    }
    catch (err) {
        res.status(500).json({error: `meaningless error message`})
    }
})

//D
router.delete('/:id', warez.validatePostId, async (req, res) => {
    try {
        await db_posts.remove(req.params.id)
        ?   res.status(200).json({message: `post has been died`})
        :   res.status(404).json({message: `invalid id, post escaped termination`})
    }
    catch (err) {
        res.status(500).json({error: `I didn't code the server wrong, you coded the frontend wrong!`})
    }
})

module.exports = router;