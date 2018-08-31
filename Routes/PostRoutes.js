const express = require('express'); 
const postDb = require('../data/helpers/postDb.js')

const router = express.Router();


router.get('/', (req,res) => {
    postDb.get().then(posts => {
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({error: "There was an error retrieving the posts from the database"})
    })
}); 

router.get('/:id', (req,res) => {
    const id = req.params.id; 
    postDb.get(id).then(post => {
        console.log(post)
        if(post){
            res.status(200).json(post);
        }
    }).catch(err => {
        res.status(500).status.json({error:"The post information could not be retrieved"})
    })
}); 

router.post('/', (req,res) => {
    const data = req.body; 
    if(data.userId && data.text){
        postDb.insert(data).then(postId => {
            res.status(201).json({message: "New post successfully created!"})
        }).catch(err => {
            res.status(500).json({error: "There was an error creating the post in the database"})
        })
    }else {
        res.status(400).json({message: "Please provide userId and text for post request body"})
    }
}); 

router.delete('/:id', (req,res) => {
    const id = req.params.id; 
    postDb.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully removed post!"})
        }else {
            res.status(404).json({error: "Post with speficied ID does not exist"})
        }
    }).catch(err => {
        res.status(500).json({error: "Error accessing data from the database"})
    })
}); 

router.put("/:id", (req, res) => {
    const id = req.params.id; 
    const updatedData = req.body; 
    if(updatedData.userId && updatedData.text){
        postDb.update(id, updatedData).then(count => {
            if(count > 0){
                res.status(200).json({message:"post information updated"})
            }else {
                res.status(404).json({error: "The post with the specified ID does not exist"})
            }
        }).catch(err => {
            res.status(500).json({error: "Error when updating post information in database"})
        })
    }else {
        res.status(400).json({message: "Please provide userId and text in updated data"})
    }
}); 

module.exports = router; 