const express = require ('express');

const Users = require("../users/userDb.js")

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const user = await Users.get()
        res.status(200).json(user)
    }
   catch (error) {
       res.status(500).json({message:"Error"})
   }
})

router.post('/:id/posts', async (req, res) => {
    const userPost = { ...req.body, user_id: req.params.id };
    try{
        const user = await Posts.insert(userPost);
        res.status(210).json(user); 
    } catch (error) {
        res.status(500).json({message:"Error inserting user posts"})
    }
});

router.get('/', async (req, res) => {
    try{
        const user = await Users.get()
        res.status(200).json(user)
    }
   catch (error) {
       res.status(500).json({message:"Error"})
   }
})
router.get('/:id', async (req, res) => {
    try {
        const postByUser = await Users.getById(req.params.id);
        res.status(200).json(postByUser)
    } catch (error) {
        res.status(500).json({message:"Error retrieving user post by Id"})
    } 
});

router.get('/:id/posts', async (req, res) => {
})

router.delete('/:id', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
