const express = require('express');

const db = require('../helpers/userDb.js');

const userRouter = express.Router();

//GET:

userRouter.get('/', (req, res ) => {
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

userRouter.get('/:id', ( req, res ) => {
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

    userRouter.post('/', ( req, res ) => {
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

    userRouter.delete('/:id', ( req, res ) => {
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

//PUT:

userRouter.put('/:id', ( req, res ) => {
    const { id } = req.params;
    const changes = req.body;

    db
    .update( id, changes ) 
    .then(userInfoUpdate => {
        if( !userInfoUpdate )  {
            res.status(404).json({ success: false, message:'The user with the specified ID does not exist.'  })
        }else if ( !changes.name ){
            return res.status(400).json({ success: false, message: 'Please provide the name of the  user.' })
        }else{
            return res.status(200).json({ success: true, changes })
    }

})
.catch(err=> {
    res.status(500).json({ success: false, error:'The user information could not be modified.' })
})
})



module.exports = userRouter;