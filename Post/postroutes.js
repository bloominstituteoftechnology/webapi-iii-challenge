const express = require('express');
const router = express.Router();
const db = require('../data/helpers/postDb.js');


router.post('/', (req, res) => {
    const user = req.body;

    user.insert(obj)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({err: err})
    })

})

router.post('/:id', (req, res) => {
    
})

router.get('/:id', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})
router.delete('/:id', (req, res) => {
    
})
module.exports = router;