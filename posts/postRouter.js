const express = require('express');
const postdb = require('../data/helpers/postDb');

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
router.post('/', async (req, res) => {
    const {name} = req.body;
    if (!name) {
    res.status(400)
    .json({message: "Please provide a name for the new user."})
    } else {
        try {
        const userInfo = req.body;
        const userId  =await userdb.insert(userInfo);
        res.status(201).json(userId);
        } catch (error) {
        res.status(500).json({error: "An error occurred while saving this user."})
    }
    }
})

//UPDATE /api/users/:id
router.put('/:id', nameCap, (req, res) => {
    const {id} = req.params;
    const changes = req.body;
     if (!changes.name) {res.status(400)
        .json({error: "Please provide the updated user's name."})
    } else {
        userdb.update(id, changes)
        .then(count => {
            if (count) {
            res.status(200)
            .json(count);
            } else {
                res.status(404)
                .json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500)
            .json({error: "The user info could not be modified."})
        })
    }
})

//DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    userdb.remove(id)
    .then(count=>{
        if (count) {
        res.status(200)
        .json(count);
        } else {
            res.status(404)
            .json({message: "The user with the specififed ID does not exist."})
        }
    })
    .catch(error=>{
        res.status(500)
        .json({error: "The user could not be removed."})
    })
})

module.exports = router; 