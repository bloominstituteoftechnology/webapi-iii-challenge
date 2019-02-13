const express = require('express');
const db = require('../data/helpers/postDb');
const router = express();

// MIDDLEWARE 

const checkIncomingPost = (req, res, next) => {
    const post = req.body.text;
    if(!post) {
        res.status(404).json({ message: 'add some text' })
        next();
    } else {
        next();
    }
}
// CREATE in CRUD 

router.post('/posts/:id', checkIncomingPost, async (req, res) => {
    let post = req.body;
    const id = req.params.id;
    post = {...post, user_id: id}
    try {
        const newPost = await db.insert(post);
        res.status(201).json(newPost)
    }
    catch(error) {
        res.status(500).json({message: 'mistake on our side... sorry about that!'})
    }
})

// READ in CRUD 
router.get('/posts', async (req, res) => {
    try {
        const posts = await db.get()
        if(posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({message: 'looks like theres an issue on your side=... try again?'})
        }
    }
    catch(error) {
        res.status(500).json({message: 'mistake on our side... sorry about that!'})
    }
})

router.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const posts = await db.get(id)
        if(posts) {
            res.status(200).json(posts)
        } else {
            console.log(posts)
            res.status(404).json({message: 'looks like theres no post for that user'})
        }
    }
    catch(error) {
        res.status(500).json({message: 'mistake on our side... sorry about that!'})
    }
})

// UPDATE in CRUD
router.put('/posts/:id', async(req, res) => {
    const id = req.params.id;
    const info = req.body;
    try {
        const updatedPost = await db.update(id, info)
        if(updatedPost) {
            res.status(202).json({message: 'your post has been updated'})
        } else {
            res.status(404).json({message: 'we can\'t find that post'})
        }
    }
    catch(error) {
        res.status(500).json({message: 'ahhhh sorry, we\'re having issues'})
    }
})

// DELETE in CRUD
router.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db.remove(id)
        if(deleted) {
            res.status(204)
        } else {
            res.status(404).json({message: 'we cant find that post... try again'})
        }
    }
    catch(error) {
        res.status(500).json({ message: 'ahhhh sorry, we\'re having issues'})
    }
});

module.exports = router;