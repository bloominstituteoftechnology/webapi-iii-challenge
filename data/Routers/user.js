const express = require('express');

const router = express.Router()

const db = require('../helpers/userDb');


router.get('/:id', (req, res)=> {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error is your face ", error ));
    })

})

router.get('/:id/posts', (req, res) => {
    const { userId } = req.params;

    db.getUserPosts(userId)
    .then(posts => {
        res.json(posts)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error is your life ", error))
    })
})






module.exports = router;