const express = require('express')
const router = express.Router()
const db_users = require('./userDb')
const db_posts = require('../posts/postDb')

//C
router.post('/', (req, res) => {

})

router.post('/:id/posts', (req, res) => {

})

//R
router.get('/', async (req, res) => {
    try {
        const users = await db_users.get()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(400).json({message: `No users found, have you checked the fridge?`})
    }
    catch (err) {
        res.status(500).json({error: `Server broken looking for users, try again when it's fixed.`})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await db_users.getById(req.params.id)
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `User not found, I never was good at finding Waldo.`})
    }
    catch (err) {
        res.status(500).json({error: `Server died trying to find user.`})
    }
})

router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await db_users.getUserPosts(req.params.id)
        posts.length > 0
        ?   res.status(200).json(posts)
        :   res.status(200).json({message: `User doesn't know how to post, move along.`})
    }
    catch (err) {
        res.status(500).json({error: `Server broke trying to read users posts.`})
    }
})

//U
router.put('/:id', (req, res) => {

})

//D
router.delete('/:id', (req, res) => {

})

module.exports = router;
