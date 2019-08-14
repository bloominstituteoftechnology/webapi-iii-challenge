const express = require('express');

const router = express.Router();

const db = require('./userDb.js');


router.post('/', validateUser, async (req, res) => {
    try {
        const user = await db.insert(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Could not add user.'
        })
    }
});

router.post('/:id/posts', async (req, res) => {
try {
    const { id } = req.params;
    const userPost = await db.insert(id);
    res.status(201).json(userPost);
} 
catch (error) {
    console.log(error);
    res.status(500).json(error);
}   
});

router.get('/', async (req, res) => {
    try {

        const user = await db.get(req.query)
        console.log(user)
        res.status(200).json(user);
        }
    
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }

});

router.get('/:id', validateUserId, async(req, res) => {
    try {
        const { id } = req.params;
        const user = await db.getById(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Could not find user.'
        })
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.getUserPosts(id);
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error finding posts.'
        })

    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
    const { id } = req.params;
    const deleteUser = await db.remove(id);
    res.status(200).json({ message: 'User has been terminated!'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Could not delete user.'
        })
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.update(id, req.body);
        res.status(200).json({ message: 'User has been updated.'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Could not find user.'
        })
    }
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    db.getById(id)
    .then(hub => {
        if (hub) {
            req.hub = hub
            next();
        }
        else {
            res.status(404).json({message: 'no id for hub'})
        }

    })
    .catch( error => {
        console.log(error)
        res.status(500).json({
            message: 'Error processing request.'
        })
        
});
}
function validateUser(req, res, next) {
    if (Object.values(req.body).length > 0) {
        next()
    }
    else {
        res.status(400).json({ message: 'missing user data' })
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
