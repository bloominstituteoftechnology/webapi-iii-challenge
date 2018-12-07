const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    postDb.get(id)
       .then((post) => {
           if (post) {
               res.json(post);
           } else {
               res.status(400)
               .json({message: "The post with this id does not exist."})
           }
           res.json(post);
       })
       .catch(err =>
           res.status(500)
           .json({ error: "The user info could not be retrieved."})
           )
})

router.post('/', (req, res) => {
    const post = req.body;

    if (post.text && post.userId) {
        postDb.insert(post).then(idReturn => {
            postDb.get(idReturn.id).then(post => {
                res.status(201).json(post);
            });
        }) .catch(err => {
            res.status(500)
            .json({error: "Error occured when saving post to database"})
        });
    } else {
        res.status(400).json({error: "Please provide name."})
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    postDb.remove(id).then(count => {
        if (count) {
            res.json({message: "Successfully Delete Item"})
        }else {
            res.status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
    } 

    ).catch(err => {
        res.status(500)
        .json({error: "The user could not be removed"})
    } )
})

module.exports = router; 