const express = require('express');

const router = express.Router()

const db = require('../helpers/postDb');


router.get('/:id', (req, res)=> {
    const { id } = req.params;

    db.get(id)
    .then(post => {
        res.json(post)
    })


})






module.exports = router;