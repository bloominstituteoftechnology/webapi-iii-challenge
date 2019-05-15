const express = require('express')
const router = express.Router()
const db_users = require('./userDb')
const db_posts = require('../posts/postDb')

//C
router.post('/', async (req, res) => {
    try {
        const user = await db_users.insert(req.body)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({message: `new user broke server before being added`})
    }
})

router.post('/:id/posts', async (req, res) => {
    try {
        let post = {...req.body, user_id: req.params.id}
        post = await db_posts.insert(post)
        res.status(201).json(post)
    }
    catch (err) {
        res.status(500).json({message: `the awesomeness of this post broke the server, sorry`})
    }
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
router.put('/:id', async (req, res) => {
    try {
        await db_users.update(req.params.id, req.body)
        ?   res.status(200).json({id: req.params.id, ...req.body})
        :   res.status(404).json({message: `user doesn't want to be found`})
    }
    catch (err) {
        res.status(500).json({error: `server error: user is const`})
    }
})

//D
router.delete('/:id', async (req, res) => {
    try {
        await db_users.remove(req.params.id)
        ?   res.status(200).json({message: `user has been died`})
        :   res.status(404).json({message: `user is invincable, cannot be killed because they don't exist.`})
    }
    catch (err) {
        res.status(500).json({error: `whoever wrote this server didn't write it good enough`})
    }
})

module.exports = router;
