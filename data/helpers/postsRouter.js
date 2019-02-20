const express = require('express');

const db = require('../helpers/postDb.js');

const postRouter = express.Router();

//GET:

postRouter.get('/', (req, res ) => {
    db
    .get()
    .then(posts => {
        res.status(200).json({ success: true, posts});
    })//headers
    .catch(err => {
        res.status(500).json({ success: false, message: 'The user information could not be retrieved.'})
    })
})

//GET:

postRouter.get('/:id', ( req, res ) => {
    const { id } = req.params;

    db.getById(id)
    .then(posts => {
        if (posts) {
            res.status(201).json({ success: true, posts});
        }else{
            res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: 'The post information could not be retrieved.'})

        })
    })

        //DELETE: 

postRouter.delete('/:id', ( req, res ) => {
    const { id } =req.params;
        db
        .remove(id)
        .then(post => {
            if( post ){
                res.status(204).end();
            }else{
                res.status(404).json({ success: false,  message:'The post with the specified ID does not exist.' })
                }
            })
        .catch(err => {
                res.status(500).json({ error: 'The post could not be removed' })
            })
        })

module.exports = postRouter;
