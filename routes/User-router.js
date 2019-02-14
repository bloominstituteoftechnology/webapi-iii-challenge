const express = require('express');
const router = express.Router();

const Users = require('../data/helpers/userDb');
const Posts = require('../data/helpers/postDb');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the user!'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the user!'});
    }
});

// POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST 
router.post('/', uppercaseCheck(), async (req, res) => {
    if (!req.body.name || !req.body.name === '') {
        res.status(400).json({message:'Please provide valid username'})
    }
    try {
        const user = await Users.insert({name: req.body.name});
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the user!'});
    }
});

// DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The user has been deleted'});
        } else {
            res.status(404).json({message: 'The user could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the user.'});
    }
});

// PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // 
router.put('/:id', uppercaseCheck(),  async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body);
        if(user) {
            res.status(200).json(user);
        }else {
            res.status(404).json({message: 'could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the user.'});
    }
})

// Post a Post // Post a Post // Post a Post // Post a Post // Post a Post // Post a Post // Post a Post // Post a Post // Post a Post // Post a Post 
router.get('/:id/posts', async (req, res) => {
   
    try {
        const posts = await Users.getUserPosts(req.params.id);
        if(posts) {
            res.status(200).json(posts);
        }else {
            res.status(404).json({message: 'could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error finding the post.'});
    }

})


function uppercaseCheck (name) {
    return function (req, res, next) {
        if (!req.body.name) {
            res.status(422).json({ message: "name required" });
          } else {
            req.body.name = req.body.name.toUpperCase();
            next();
          }
    }
}


const error = {
    name: 'wrong name!!'
}

module.exports = router;
