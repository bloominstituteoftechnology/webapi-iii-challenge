const express = require('express');

const db = require('../helpers/userDb.js');

const router = express.Router();

//GET:

router.get('/', (req, res ) => {
    db
    .get()
    .then(users => {
        res.status(200).json({ success: true, users});
    })//headers
    .catch(err => {
        res.status(500).json({ success: false, message: 'The user information could not be retrieved.'})
    })
})

//GET:

router.get('/:id', ( req, res ) => {
    const { id } = req.params;

    db.getById(id)
    .then(users => {
        if (users) {
            res.status(201).json({ success: true, users });
        }else{
            res.status(404).json({ success: false, message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: 'The user information could not be retrieved.'})

        })
    })


    //POST:

    router.post('/', ( req, res ) => {
        const { name } = req.body;
        if ( !name) {
            res.status(400).json({ error: 'Please provide name of the user.' });
        }else{
            db
            .insert({ name })
            .then(user => {
                res.status(201).json( user );
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error while saving the user to the database' })
            })
        }
    })


    //DELETE: 

    router.delete('/:id', ( req, res ) => {
    const { id } =req.params;
    db
    .remove(id)
    .then(user => {
        if( user ){
            res.status(204).end();
        }else{
            res.status(404).json({ success: false,  message:'The user with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The user could not be removed' })
    })
})



module.exports = router;