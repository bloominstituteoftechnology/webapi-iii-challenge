const express = require('express');
const router = express.Router();
const postDb = require('../data/helpers/postDb');

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        next({code: 403});
    }
}

// READ
router.get('/', async (req, res, next) => {
    try {
        const posts = await postDb.get();
        
        res.status(200).json(posts);
    } catch(err) {
        next({code: 500});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);
        
        if(posts.length > 0) {
            const post = await postDb.get(id);
            
            res.status(200).json(post);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

router.get('/:id/postTags', async (req, res, next) => {
    try {
        const {id} = req.params;
        const post = await postDb.getPostTags(id);

        if(post[0]) {
            res.status(200).json(post);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

// CREATE
router.post('/', isEven, async (req, res, next) => {
    try {
        const post = {...req.body};

        if(!post.userId || !post.text) {
            next({code: 400});
        } else {
            const newPost = await postDb.insert(post);
            res.status(201).json(post);
        }
    } catch(err) {
        next({code: 500});
    }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
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
            next({code: 404});
        } else {
            next({code: 400});
        }
    } catch(err) {
        next({code: 500});
    }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);

        if(posts.length > 0) {
            const post = await postDb.remove(id);

            res.status(200).json(posts);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

module.exports = router;
