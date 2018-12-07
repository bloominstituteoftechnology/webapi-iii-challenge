const express = require('express');
const router = express.Router();

const posts = require('../data/helpers/postDb');


//endpoints
router.post('/', (req, res) => {
    const {userId, text} = req.body;
    if(!userId || !text){
        res.status(401).json({message:"could not add post"})
    }
    posts.insert({userId, text})
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(500).json({message:"error posting"})
    })
})

router.get('/', (req, res) => {
    posts.get()
    .then(getPost => {
        res.status(200).json(getPost);
    })
    .catch (err => {
        res.status(500).json({message: "post not found"})
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    posts.get(id)
    .then(post => {
        if(post){
            res.json(post);
        }
        else {
            res.status(404).json({message:"post does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message:"post could not be retrieved"})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    posts.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "success"});
        } else {
            res.status(404).json({message:"could not delete"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"post could not be retrieved"})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { userId } = req.params;
    const { text } = req.body;
    
    if(userId, text){
        posts.update(id, {userId, text})
        .then(post => {
            if (post) {
                posts.getPostTags(id)
                .then(post => {
                    res.json(post);
                });
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'post could not be retrieved'});
        });
}});

module.exports = router;