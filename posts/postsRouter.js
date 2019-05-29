const express = require('express');
const Users = require('../users/userDb.js');
const Post = require('./postDb');
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
try{
    const user = await Users.insert(req.body);
    res.status(201).json(user);

}catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There was an error adding the user',
    });
  }
});

router.post('/:id/posts', async (req, res) => {
const userPost= {...req.body, user_id: req.params.id };
try{
    const user = await Post.insert(userPost);
    res.status(201).json(user);
}catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There was an error adding the post',
    });
  }
});

router.get('/', async (req, res) => {
    try{
        const users = await Users.get();

        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({
            message: "The users could not be retrieved"
        })
    }

});

router.get('/:id', validateUserId, async (req, res) => {
try{
    const user = await Users.getById(req.params.id);
    if(user) {
        res.status(200).json(user);
    }else{
        res.status(404).json({message:'The user does not exist'});
    }
} catch (error) {
      
    res.status(500).json({
      message: 'There was an error retrieving the post',
    });
  }
});



router.get('/:id/posts', validateUserId, async (req, res) => {
try{
    const post = await Users.getUserPosts(req.params.id);
  res.status(200).json(post);
    }catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'There was an error getting the messages for the hub',
        });
      }
});

router.delete('/:id', validateUserId, async(req, res) => {

    try{
        const user = await Users.remove(req.params.id);
        if(user>0) {
            res.status(200).json({message:'The user was removed'});
        } else{
            res.status(404).json({message: 'This user is not found'});
        }

    }catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'There was an error removing the user',
        });
      }

});

router.put('/:id', validateUserId,  async (req, res) => {
    try{

        const user = await Users.update(req.params.id, req.body);
        if(user) {
            res.status(200).json(user);
        }else{
            res.status(404).json({message:'This user is  not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'There was an error updating the hub',
        });
      }

});

async function validateUserId(req, res, next) {
    try{
        const {id} = req.params;
        const user = await Users.getById(id);
        if(user) {
            req.user = user;
            next();
        }else{
            res.status(404).json({message: 'There user not found or invalid id'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'There was an error getting the user',
          });
        }
};

function validateUser(req, res, next) {
    const name = req.body;
  if(req.body && Object.keys(req.body).length) {
      next();
  }else{
    res.status(404).json({message: 'Please use name field'});
  }
};

function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length){
        next();
    }else{
        next({message: 'Please include req body'});
    }

};

module.exports = router;