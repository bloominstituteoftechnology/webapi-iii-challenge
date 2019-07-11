const express = 'express';
const Users = require('./userDB.js');
const Posts = require('../posts/postDB.js');
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    try{
        const user = await Users.insert(req.body);
        res.status(201).json(user)
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    try{
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.get('/', async (req, res) => {
    try{
        const users = await Users.get();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try{
        const user = await Users.getById(req.params.id);
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({message: "No user found for this ID"});
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try{
        const userPosts = await Users.getUserPosts(req.parmas.id);
        if(userPosts){
            res.status(200).json(userPosts)
        }
        else{
            res.status(404).json({message: "This user has no posts"})
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try{
        const count = await Users.remove(req.params.id);
        if(count > 0){
            res.status(200).json({message: "User has been deleted successfully"})
        }
        else{
            res.status(404).json({message: "There is no user with this id"})
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
    try{
        const user = await Users.update(req.body);
        if(user){
            res.status(204).json(user);
        }
        else{
            res.status(404).json({message: "There is no user with this id"})
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});


//custom middleware

async function validateUserId(req, res, next){
    const user = await Users.getById(req.params.id);
    if(user){
        req.user = user;
    }
    else{
        res.status(400).json({ message: "invalid user id" });
    }
    next();
}

function validateUser(req, res, next) {
    if(!req.body){
        return res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name){
        return res.status(400).json({ message: "missing required name field" });
    }
    next();
};

function validatePost(req, res, next) {
    if(!req.body){
        return res.status(400).json({ message: "missing post data" });
    } else if (!req.body.name){
        return res.status(400).json({ message: "missing required name field" });
    }
    next();
};

module.exports = router;
