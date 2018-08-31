const express = require('express');
const router = express.Router();
const userModel = require('./usersModel.js');

router.get('/', (req, res)=>{
    let { id } = req.params;
    userModel.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to grab user list.' })
        })
});

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
    console.log(req.body.name);
    
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
    console.log(id);
    
    userModel.remove(id)
        .then(data => {
            res.status(204).json({message: 'User deleted.'});
        })
        .catch(err => {
            res.status(500).json({message: 'Unable to delete user.'})
        });
});

module.exports = router;