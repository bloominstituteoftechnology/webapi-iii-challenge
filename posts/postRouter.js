const express = require('express');
// const cors = require ('cors');

const posts = require('./postDb.js');
const user = require('../users/userDb.js');

const router = require('express').Router();


//GET
router.get('/', (req, res) => {
    posts.get()
    .then(data=>{
        res.status(200).json(data)
    });
});

router.get('/:id', (req, res) => {
    posts.getById(req.params.id)
    .then(data=> {
        res.status(200).json(data)
    })
    .catch(err=> {
        console.log('Error: ', err);
        res.send(500).json({message: 'Error retrieving data.'})
    });
});


//DELETE
router.delete('/:id', (req, res) => {
    posts.remove(req.params.id)
    .then(count=> {
        if(count > 0){
            res.status(200).json({message: `Post has been deleted.`})
        } else {
            res.status(400).json({message: 'Post not found.'})
        }
    })
    .catch (err=> {
        console.log('Error: ', err);
        res.status(500).json({message: 'Error deleting psot.'})
    })
});


//PUT
router.put('/:id', (req, res) => {
    posts.update(req.params.id)
    .then(data=> {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(400).json({message: 'Post not found.'})
        }
    })
    .catch (err=> {
        console.log('Error: ', err);
        res.status(500).json({message: 'Error updating psot.'})
    })
});

// CUSTOM MIDDLEWARE
function validatePostId(req, res, next) {
    const valPostId = req.params.id;
    if(valPostId === null){
        res.status(400).json({message: 'Please add Id#.'})
    } else if (posts.getById(valPostId)){
        next()
    } else {
        res.status(401).json({you: 'Boo. Not validated.'})
    }
};

router.use(validatePostId);


module.exports = router;