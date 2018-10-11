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
router.route('/id:')
.get((req,res) => {
    const { id } = req.params;
    userDb.get(id)
    .then(user =>) {
        if (!user) return res.status(404).json({message: "The user with the specified ID does not exist"});
        return res.status(200).json(user);
    })
    .catch(err => res.status(500).json({error: "Information cannot be retreived."}));
})
.put(upperCaser, (req,res) => {
    const { id } = req.params;
    const { name } = req;
    const editeduser = { name };
   userDb.update(id,editUser)
   .then(updatedUser => {
       if(!updatedUser) return res.status(404).json({message: "The user with specified ID does not exist"});
    if(!name) return res.status(200).json(updtatedUser);
    })
.catch(err => res.status(500).json({error: "the user information could not be modified."})));

})

.delete((req,res) => {
    
})