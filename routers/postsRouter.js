const express = require('express');
const router = express.Router();
const postDb = require('../data/helpers/postDb');

// custom errors
const errors = {
    400: 'Please provide information with your request.',
    403: 'Balance is the key, making things even is the secret to success.',
    404: 'The specified ID does not exist.',
    500: 'The information could not be accessed or modified.'
}

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        res.status(403).json({error: errors["403"]});
    }
}

// READ
router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();
        
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);
        
        if(posts.length > 0) {
            const post = await postDb.get(id);
            
            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

router.get('/:id/postTags', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.getPostTags(id);

        if(post[0]) {
            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// CREATE
router.post('/', isEven, async (req, res) => {
    try {
        const post = {...req.body};

        if(!post.userId || !post.text) {
            res.status(400).json({error: errors["400"]});
        } else {
            const newPost = await postDb.insert(post);
            res.status(201).json(post);
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = req.body;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);
        
        if(posts.length > 0 && (post.userId && post.text)) {
            const updatePost = await postDb.update(id, post);
            findPost = await postDb.get(id);
            
            res.status(200).json(findPost);
        } else if (!posts.length > 0) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.get(id);

        if(post) {
            const delPost = await postDb.remove(id);

            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

module.exports = router;
