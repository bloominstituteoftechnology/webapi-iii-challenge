const express = require('express')
const router = express.Router();

const Db = require('./postDb');



const getPosts = async (req, res) => {
    try {
        const users = await Db.get();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({Error: error})
    }
}

const getPostsById = async (req, res) => {
    
    try {
        const { id } = req.params;
        console.log(id);
        const user = await Db.getById(id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({Error: "id not found"});
        }
        
    } 
    catch (error) {
        res.status(500).json({Error: error});
    }
}

const postPosts = async (req, res) => {
    try {
        const { body } = req;
        const user = await Db.add(body);
        if(!body) {
            res.status(401).json({Error: "post must have content"});
        }
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({Error: "error adding post to database."})
    }
}

const updatePosts = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        if(!body) {
            res.status(401).json({Error: "post must have content"});
        }
       else {
            const user = await Db.update(id, body);
            if(user) {
                res.status(201).json({id, body: body.name});
            } else {
                res.status(404).json({Error: "id not found"})
            }
        }
    } catch (error) {
        res.status(500).json({Error: "There was an error in saving post to database"});
    }
}

const deletePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Db.remove(id);
        if(user) {
            res.status(204).end();
        } else {
            res.status(404).json({Error: "id not found"});
        }
    } catch (error) {
        res.status(500).json({Error: "error deleting id from database"})
    }
}


router.route('/')
    .get(getPosts)
    .post(postPosts);

router.route('/:id')
    .get(getPostsById)
    .put(updatePosts)
    .delete(deletePosts);


module.exports = router;