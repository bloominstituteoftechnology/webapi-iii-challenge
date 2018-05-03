const express = require('express');
const router = express.Router();
const tagDb = require('./data/helpers/tagDb');

//get -- tag 
router.get('/', (req, res) => {
    tagDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- tag 
router.post('/', (req, res) => {
    const tagInfo = req.body;
    console.log(tagInfo);
    tagDb
    .insert(tagInfo)
    .then(response => {
        res.status(201).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- tag 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    tagDb.remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- tags
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    tagDb
    .update(id, tag)
    .then(response => {
        res.status(200).json({ tag })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

module.exports = router;
