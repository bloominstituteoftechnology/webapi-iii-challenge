const express = require('express');
const postdb = require('../data/helpers/postDb');
const postRoutes = express.Router();

/*****************************************/
/*** POSTS METHODS ***/
/*****************************************/

// Get all posts

postRoutes.get('/', (req, res) => {
    postdb.get()
    .then(posts => {
        return res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error getting posts data."})
    })
})

// Get single post

postRoutes.get('/:id', (req, res) => {
    const {id} = req.params;
    postdb.get(id)
    .then(post => {
        if(!post){
            return res.status(404).json({message: `Post with ID ${id} does not exist.`})
        }
        return res.status(200).json(post)
    })
    .catch(err => {
        console.log(err);   
        return res.status(500).json({message: "Failed to retrieve post."});
    })
})

// Add new post
postRoutes.post('/', (req, res) => {
    let newPost = {
        text: req.body.text,
        userID: req.body.userID
    }

    if(!newPost.text || !newPost.userID){
        return res.status(400).json({message: "You must input text and a userID."})
    }

    postdb.insert(newPost)
    .then(id => {
        const newPostID = id.id;
        return postdb.get(newPostID)
        .then(post => {
            if(!post){
                return res.status(404).json({message: `The post could not be found.`})
            }
            return res.status(201).json(`New post with ID ${newPostID} added successfully.`);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: "Error adding new post."})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error adding new post."})
    })
    })
})

// Delete post
postRoutes.delete('/:id', (req, res) => {
    let id = req.params.id;

    postdb.remove(parseInt(id))
    .then(reply => {
        if(!reply){
            return res.status(404).json({message: `The post with ID ${id} does not exist.`})
        }
        return res.status(200).json({message: `Post with ID ${id} deleted successfully.`})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "There was an error removing this post."})
    })
})

// Edit post

postRoutes.put('/:id', (req, res) => {
    const {id} = req.params;
    const newText = req.body;

    postdb.update(parseInt(id), newText)
    .then(post => {
        if(!post){
            return res.status(404).json({message: `The post with ID ${id} does not exist.`})
        }
        res.status(200).json({message: `Post with ID ${id} updated successfully.`})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'Error updating post.'})
    })
})

module.exports = postRoutes;