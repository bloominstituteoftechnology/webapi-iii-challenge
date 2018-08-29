const express = require('express');
const router = express.Router();

const db = require('../helpers/postDb');


router.get('/', (req, res)=> {

    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting posts ", error))
    })

})

router.get('/:id', (req, res)=> {
    const { id } = req.params;

    db.get(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting post ", error))
    })
})



module.exports = router;