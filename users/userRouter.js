const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();


// Create a new user
router.post('/', async (req, res) => {
    const { name } = req.body;
    console.log(name);
    if (!name){
        res.status(400).json({ errorMessage: "Please provide the user name." });
    }
    else {
        try {
            const newUser = await Users.insert({name});
            //const newUserData =  await Users.getById(newUserId);
            res.status(200).json(newUser);
        } 
        catch (error) {
            res.status(500).json({ errorMessage: "There was an error while adding the new user" });
        }
    } 
});

// create a post for a user by its id
router.post('/:id/posts', async (req, res) => {
    const user_id = req.params.id;
    const text = req.body.text;
    if (!user_id || !text){
        res.status(404).json({ errorMessage: "Please provide a User ID and Post text." });
    }
    else {
        const userToAddPostTo = await Posts.getById(user_id);
        if(!userToAddPostTo || userToAddPostTo.length === 0){
            res.status(404).json({ errorMessage: "The User with the specified ID does not exist." });
        }
        else {
            try {
                const insertedPost = await Posts.insert({text, user_id});
                // const newCommentData =  await Posts.findCommentById(insertedComment.id);
                res.status(200).json(insertedPost);
            } 
            catch (error) {
                res.status(500).json({ errorMessage: "There was an error while saving the post to the database" });
            }
        }      
    } 
});

// get all users in the DB
router.get('/', async (req, res) => {
    try {
        const allUsers = await Users.get();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

// get user by its id
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
    const user = await Users.getById(userId);
    if(user){
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
    } catch (error) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
});

// get list of post for a given user id
router.get('/:id/posts', async (req, res) => {
    const userId = req.params.id;
    try {
    const posts = await Users.getUserPosts(userId);
    if(posts && posts.length > 0){
        res.status(200).json(posts);
    }
    else {
        res.status(404).json({ errorMessage: "The post with the specified user ID does not exist." });
    }
    } catch (error) {
    res.status(500).json({ errorMessage: "The posts information could not be retrieved." });
    }
});

// delete a user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    const userToBeDeleted = await Users.getById(userId);
    if(!userToBeDeleted){
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
    else {
        const deletedUser = userToBeDeleted;
        try{
            await Users.remove(userId);
            res.status(200).json(deletedUser)
        }
        catch(error){
            res.status(500).json({ errorMessage: "The user could not be removed" });
        }
    }
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
