const express = require('express');
const router = express.Router();

const posts = require('../data/helpers/postDb');


//endpoints
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
    posts.getPostTags(id)
    .then(post => {
        if(post[0]){
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

module.exports = router;