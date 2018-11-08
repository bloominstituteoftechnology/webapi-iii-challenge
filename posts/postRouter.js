const express = require('express');
const postdb = require('../data/helpers/postDb');
const userdb = require('../data/helpers/userDb');
const router = express.Router();

//middleware
router.use(express.json());

//endpoints for postdb CRUD methods
// GET /api/posts/
router.get('/', (req, res) => {
    postdb.get()
    .then(posts =>{res.status(200)
    .json(posts)
    })
    .catch(error=>{res.status(500)
    .json({error: "The posts could not be retrieved."})
    })
});

//GET by post's id (not userId attached to post) /api/posts/:id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    postdb.get(id)
    .then(post => {
        if (post){
        res.status(200)
        .json(post);
        } else {
            res.status(404).json({message: "The post with the specified data does not exist."})
        }
    })
    .catch(error => {res.status(500)
        .json({message: "The post info could not be retrieved."})
    })
})

//POST /api.posts/
router.post('/', (req, res) => {
    const {userId, text} = req.body;
    //first check to make sure the user submitted a text and userId with the request
    if (!userId || !text) {
    res.status(400)
    .json({message: "Please provide the user's id and the text for their new post."})
    } else {
        //then check to make sure a user exists in the USERDB with the submitted userId
    userdb.get(userId)
    .then(user =>{
        if(user) {
                //if yes, then run the post request to postdb
            try {
            const postInfo = req.body;
            postdb.insert(postInfo);
            res.status(201).json(req.body);
            } catch (error) {
            res.status(500).json({error: "An error occurred while saving this post."})
            }
    //otherwise, return 404
        } else {
                res.status(404).json({message: "The user with that userId does not exist."})
            }        
        })
        }
})

//UPDATE /api/users/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.text || !changes.userId) {res.status(400)
        .json({error: "Please provide the updated post's text and user ID."})
    } else {
        postdb.update(id, changes)
        .then(count => {
            if (count) {
            res.status(200)
            .json(count);
            } else {
                res.status(404)
                .json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500)
            .json({error: "The post info could not be modified."})
        })
    }
})

// //DELETE /api/users/:id
// router.delete('/:id', (req, res) => {
//     const {id} = req.params;
    
//     userdb.remove(id)
//     .then(count=>{
//         if (count) {
//         res.status(200)
//         .json(count);
//         } else {
//             res.status(404)
//             .json({message: "The user with the specififed ID does not exist."})
//         }
//     })
//     .catch(error=>{
//         res.status(500)
//         .json({error: "The user could not be removed."})
//     })
// })

module.exports = router;