const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.use(express.json());


// //test get
// router.get('/', (req, res) => {
//     res.status(200).send('Hello from Posts Router')
// });

//get all posts by all users
router.get('/', async (req, res) => {
    try {
        const posts = await db.get();
        res.status(200).json(posts); 
    } catch (e) {
        res.status(500).json({
            error: "Error retrieving the posts"
        });
    }
});

//get post with specific id
router.get('/:id', async (req, res) => {
    try {
        const posts = await db.getById(req.params.id);
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({message: "id was not found, try again."})
        }
    } catch (e) {
        res.status(500).json({
            message: 'Error getting posts for that id'
        });
    }
});


// //get only posts from specific users
// router.get('/:user_id', async (req, res) => {
//     try {

//     } catch (e) {
//         res.status(500).json({
//             message: 'Error getting posts for that id'
//         })
//     }
// });

//post

router.post('/', async (req, res) => {
    try {
        if(req.body.text && req.body.user_id) {
            const newPost = await db.insert(req.body);
            res.status(200).json(newPost);
        } else {
            res.status(500).json({
                message: 'To submit a post the text and user_id are required, try again.'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'unable to add post'
        })
    }
})

//delete just one post
router.delete('/:id', async (req, res) => {
    try {
        const posts = await db.remove(req.params.id);
        res.status(200).json({
            message: 'succesfully deleted'
        })
    } catch (e) {
        res.status(500).json({
            message: 'unable to delete the posts'
        })
    }
})

//delete all posts by a specific user
router.delete('/all/:user_id', async (req, res) => {
    try {
        const posts = await db.removeByUser(req.params.user_id);
        console.log(posts)
        res.status(200).json({
            message: 'succesfully deleted'
        })
    } catch (e) {
        res.status(500).json({
            message: 'unable to delete the posts'
        })
    }
})


//update
router.put('/:id', async (req, res) => {
    try {
        const post = await db.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'The post could not be found'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "could not update the post"
        })
    }
})

module.exports = router