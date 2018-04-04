const express = require('express');

const router = express.Router()

const db = require('../helpers/userDb');


router.get('/:id', (req, res)=> {
    const { id } = req.params;
    db.get(id)
    .then(users => {
        console.log()
    })
    .catch(error => {
        res.status(500).json(console.error( "Error is your face ", error ));
    })

})






module.exports = router;