const express = require('express');
const router = express.Router();

const db2 = require('../data/helpers/postDb.js')

//middleware only applicable to posts
router.use((req, res, next) => {
    //insert logic here if you want middleware
    next();
});

// /api/posts
router.get('/', (req, res) => {
    db2.get() 
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Posts information could not be retrieved."})
    });
});

// /api/posts
router.post('/', (req, res) => {
    const post = req.body;
    console.log('posts from body', post)

    if (post.userId && post.text) {

        db2.insert(post).then(idInfo => {   // there's id vs userId per Post
            db2.get(idInfo.id).then(post => {
                res.status(201).json(post);
            });
        }).catch(err => {
                res 
                .status(500)
                .json({message: "failed to insert post in database"})
        });

    } else {
        //added layer of assurance that a more specific error message is provided
        res.status(400).json({message: "status 400: missing post userId and text"})
    }
});

// /api/posts/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db2.remove(id).then(count => {  //doc says remove() returns 'number' of post (resources) deleted
        if (count) {
            res.json({message: "successfully deleted post"})
        } else {
            res 
                .status(404)
                .json({message: "invalid id"});
        }   
    }).catch(err => {
        res 
            .status(500)
            .json({message: "fail to delete post"});
    })
})

// /api/posts/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;
    // combination of GET, POST, DELETE
    if (post.userId && post.text) {

    db2.update(id, post)    //accepts two arguments, id of resource to update & object with changes to apply
    .then(count => {
        if(count){
            //200 successfully update (send back updated post)
            db2.get(id).then(post => {
                res.json(post);
            });
        } else {
            //404 invalid id
            res 
            .status(404)
            .json({message: "invalid id"});
        }
    })
    .catch(err => {
        //500 catch-all, something else went wrong
        res 
        .status(500)
        .json({message: "something went wrong, fail to update post"})
    })

    } else {
        //400 error userId & text are missing
        res.status(400).json({message: "status 400: missing userId and text"})
    }
});

module.exports = router;