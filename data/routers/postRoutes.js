const express = require('express');
const postDb = require('../helpers/postDb.js');

const router = express.Router();
router.post('/', async (req, res, next) => {
    const post = req.body;
    try {
        if (!post.userId || !post.text) { throw new Error('Fill out userId and text please') }
        await postDb.insert(post)
        res.status(200).json(post)
    } catch (error) {
        next({ code: 501, message: error.message })
    }
})

router.get('/', async (req, res, next) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts)
    }
    catch (error) {
        next({ code: 500, message: error })
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const posts = await postDb.get(id);
        res.status(200).json(posts);
    } catch (error) {
        next({ code: 500, message: 'Posts:id get failed' })
    }
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const post = req.body;
    try {
        if (!post.userId || !post.text) { throw new Error('Fill out userId and text please') }
        await postDb.update(id, post)
        res.status(200).json(post)
    } catch (error) {
        next({ code: 501, message: error.message })
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await postDb.remove(id)
        res.status(200).send("Successfully deleted")
    }
    catch (error) {
        next({ code: 502, message: error })
    }
})
router.use((err, req, res, next) => {
    switch (err.code) {
        case 500:
            res.status(500).send({
                success: false,
                data: undefined,
                title: err.message,
                description: 'Failed posts get',
                recovery: 'Please check database'
            })
            break;
        case 501:
            res.status(501).send({
                success: false,
                data: undefined,
                title: 'Bad database modification',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        case 501:
            res.status(501).send({
                success: false,
                data: undefined,
                title: 'Removed Failed',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        default:
            res.status(404).send({ message: 'Something bad happened' })
    }
})

module.exports = router;