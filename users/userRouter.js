const express = require('express')
const router = express.Router();

const Db = require('./userDb');
const PostDb = require('../posts/postDb');



const getUsers = async (req, res) => {
    try {
        const users = await Db.get();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({Error: error})
    }
}

const getUsersById = (req, res) => {
    
    try {
        const user = req.user;
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({Error: error});
    }
}

const postUsers = async (req, res) => {
    try {
        const { body } = req;
        const user = await Db.add(body);
        if(!body) {
            res.status(401).json({Error: "user must have a name"});
        }
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({Error: "error adding user to database."})
    }
}

const updateUsers = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        if(!body) {
            res.status(401).json({Error: "user must have a name"});
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
        res.status(500).json({Error: "There was an error in saving user to database"});
    }
}

const deleteUsers = async (req, res) => {
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

const getUserPosts = async (req, res) => {
    try{
            const user_id = req.user.id;
            const posts = await Db.getUserPosts(user_id);
            if(posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({Error: "posts not found"});
            }
        }

    catch (error) {
        res.status(500).json({Error: "error in getting user posts"});
    }
}

const postUserPosts = async (req, res) => {
    try {
        const user = req.user;
        const post = await PostDb.add({text: req.body.text, user_id: user.id});
            res.status(201).json(post)
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const validateUserId = async (req, res, next) => {
    try {
        console.log("in validateUserId")
        const { id } = req.params;
        const user = await Db.getById(id);
        if(user) {
            req.user = user;
            next()
        } else {
            res.status(404).json({message: "id not found"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
}

const validateBody = (req, res, next) => {
    console.log("in validate body")
    const { body } = req;
    if(body && Object.keys(body).length > 0) {
        next();
    } else {
        res.status(400).json({Message: "Please include a body in your request"})
    }
}


router.route('/')
    .get(getUsers)
    .all(validateBody)
    .post(postUsers);

router.route('/:id')
    .all(validateUserId)
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

router.route('/:id/posts')
    .all(validateUserId)
    .get(getUserPosts)
    .all(validateBody)
    .post(postUserPosts)


module.exports = router;