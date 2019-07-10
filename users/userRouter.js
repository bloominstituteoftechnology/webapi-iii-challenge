const express = require("express");
const Users = require("./userDb");
const router = express.Router();

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

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

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
