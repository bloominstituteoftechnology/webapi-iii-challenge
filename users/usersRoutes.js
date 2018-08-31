const express = require('express');
const router = express.Router();
const userModel = require('./usersModel.js');

router.get('/', (req, res)=>{
    userModel.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to grab user list.' })
        })
});

router.get('/:userId', (req, res)=>{
    let uId = req.params.userId;
    console.log(req.params);
    
    userModel.getUserPosts(uId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            console.log('Error...', err);
            res.status(500).json({message: 'Something went wrong'})
        });
})

router.post('/', (req, res)=>{

    userModel.insert(req.body)
        .then(data => {
            res.status(201).json({ message: data})
        })
        .catch(err => {
            res.status(500).json({message: `Unable to create a new user. ${err}`})
        });
});

router.put('/:id', (req, res)=>{

    userModel.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json({message: `${data} updated.`})
        })
        .catch(err => {
            res.status(500).json({message: `Unalbe to update user name, error: ${err}`})
        });
});

router.delete('/:id', (req, res)=>{
    let { id } = req.params;
    
    userModel.remove(id)
        .then(data => {
            res.status(204).json({message: 'User deleted.'});
        })
        .catch(err => {
            res.status(500).json({message: 'Unable to delete user.'})
        });
});

module.exports = router;