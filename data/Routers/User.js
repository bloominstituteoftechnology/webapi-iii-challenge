const express = require('express');
const router = express.Router();

const db = require('../helpers/userDb');

router.get('/', (req, res) => {

    db.get()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting users list ", error ));
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting user ", error ));
    })
})

router.get('/:id/posts', (req, res) => {
    const { id }  = req.params;

    db.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting posts ", error));
    })
})


module.exports = router;