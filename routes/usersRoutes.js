const express = require('express');
const db = require('../data/helpers/userDb.js');

const router = express.Router();


router.get('/', (req, res) => {
    db
    .get()
    .then(users =>{
        res
        .status(200)
        .json(users)
    })
    .catch(error => {
        res
        .status(500)
        .json({error: 'ther was error getting the users from the server'})
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    //console.log(id);
    db
    .get(id)
    .then(users =>{
        res
        .status(200)
        .json(users)
    })
    .catch(error => {
        res
        .status(500)
        .json({error: 'ther was error getting the users from the server'})
    });
});

router.post('/', (req, res) => {
    db
    .insert(req.body)
    .then(id => {
        res
        .status(200)
        .json(id)
    })
    .catch(error =>{
        res
        .status(500)
        .json({error: 'The item was not inserted to the database'})
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    db 
    .update(id, req.body)
    .then(count =>{
        res
        .status(200)
        .json(`the user with the id of ${id} was updated successfully`)
    })
    .catch(error => {
        res
        .status(500)
        .json({error: `the user with the id of ${id} was not updated`})
    });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(count =>{
        res
        .status(200)
        .json(`${count} users were deleted successfully`)
    })
    .catch(error => {
        res
        .status(500)
        .json({error: "could not delete the user"})
    });
})

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    db
    .getUserPosts(id)
    .then(posts => {
        res
        .status(200)
        .json(posts)
    })
    .catch(error => {
        res
        .status(500)
        .json({error: "Could not get posts for the user"})
    });
})









module.exports = router;