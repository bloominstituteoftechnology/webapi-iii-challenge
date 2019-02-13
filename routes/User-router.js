const express = require('express');
const router = express.Router();

const Users = require('../data/helpers/userDb');
const Posts = require('../data/helpers/postDb');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the user!'});
    }
});

// router.get('/id', async (req, res) => {
//     try {
//         const user = await Users.getById
//     }
// })

const error = {
    name: 'wrong name!!'
}

module.exports = router;
