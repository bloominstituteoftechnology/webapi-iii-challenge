const express = require('express');

const router = express.Router()

const db = require('../helpers/userDb');

router.get('/', (req, res)=> {

    db.get()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting users list ", error ));
    })

})

router.get('/:id', (req, res)=> {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting user ", error ));
    })

})

router.get('/:id/posts', (req, res) => {
    const { id }  = req.params;

    db.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
      
    })
    .catch(error => {
        res.status(500).json(console.error( "Error pulling up posts ", error))
    })
})

router.post('/add', (req, res) => {
    const user = req.body

    db.insert(user)
    .then(user=> {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error posting ", error))
    })
})

router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const user = req.body

    db.update(id, user)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error updating ", error))
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;
    
    db.remove(id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error deleting ", error))
    })
})




module.exports = router;