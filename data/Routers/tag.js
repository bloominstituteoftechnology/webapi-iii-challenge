const express = require('express');

const router = express.Router()

const db = require('../helpers/tagDb');


// router.get('/:id', (req, res)=> {
//     const { id } = req.params;
//     db.get(id)
//     .then(user => {
//         res.json(user)
//     })
//     .catch(error => {
//         res.status(500).json(console.error( "Error is your face ", error ));
//     })

// })






module.exports = router;