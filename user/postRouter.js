const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb')
const userDb = require('../data/helpers/userDb')

router.get('/', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: 'Posts dont exist.'})
    })
})

router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    userDb
    .getUserPosts(userId)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: 'That user has no posts.'})
    })
})

router.post('/:userId', (req, res) => {
    const { text } = req.body;
    const { userId } = req.params;

    if(userId === 0 || userId === undefined){
        res.status(404).json({errorMessage: 'The user youre posting to doesnt exist'}
        )
    }
    if(text === '' || text === undefined) {
        res.status(404).json({errorMessage: 'Please provide text for your post.'})
    }
    else{
        const newPost = { userId, text }
        postDb
        .insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while creating a post.'})
        })
    }
}
)


router.get('/:userId/:postId', (req, res) => {
const {userId} = req.params;
const {postId} = req.params;

    userDb
    .getUserPosts(userId)
    .then(post => {
        postDb
        .get(postId)
        .then(userPost => {
        res.status(200).json(userPost);
        })
        
    })
    .catch(error => {
        res.status(500).json({error: 'That users legs have no legs :(:('})
    })
});

router.put('/:userId/:postId', (req, res) => {
    const { postId } = req.params;
    const { userId } = req.params;
    const { id } = req.params;
    const { text } = req.body;
    const editPost = { text }

    postDb
    
    .update( postId, editPost )
    .then(post => {
        res.status(200).json({message: `${postId} edited`})
    })
    .catch(error => {
        res.error(500).json({error: 'Post could not be edited.'})
    })


})

router.delete('/:userId/:postId', (req, res) => {
    // const { text } = req.body;
    const { postId } = req.params;

    // if(userId === 0 || userId === undefined){
    //     res.status(404).json({errorMessage: 'The user youre posting to doesnt exist'}
    //     )
    // }
    // if(text === '' || text === undefined) {
    //     res.status(404).json({errorMessage: 'Please provide text for your post.'})
    // }
    // else{
        // const newPost = { userId, text }
        postDb
        .remove(postId)
        .then(post => {
            res.status(201).json({message: `Post ${postId} deleted.`})
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while creating a post.'})
        })
    // }
})





module.exports = router;