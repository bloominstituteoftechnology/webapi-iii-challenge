const express = require('express');

const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(posts => {

        console.log(posts);
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err: 'theres been an error'
        })
    })
});

router.get('/:id', async (req, res) => {
    try { const { id } = req.params
    const posts = await db.getById(id);
    res.status(200).json(posts);
}
catch (error) {
    console.log(error);
    res.status(500).json({
        message: 'error finding posts'
    })
}
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await db.remove(id);
        res.status(204).json(id)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'could not delete'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.update(id, req.body);
        res.status(200).json({ message: 'Post has been updated.'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Could not find post.'
        })
    }
});


// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;