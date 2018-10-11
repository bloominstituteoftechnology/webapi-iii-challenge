const express = require('express');
const router = express.Router();
const upperCaser = require('../middlewares/middlewares.js').upperCaser;

router.route('/')
.post(upperCaser, (req,res) => {
    const { name } = req
    const newUser = { name };
if(!name) return res.status(400).json({errorMessage: "Please provide a user name."});
userDb.insert(newUser)
    .then(user =. res.status(201).json(user))
    .catch(err => res.status(500).json({error: "There was an error while saving the user to teh database"}))
})
.get((req,res) => {
    userDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: "The request for users could not be retrieved"}));

})