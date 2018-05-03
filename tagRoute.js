const express = require('express');
const tagDb = require('./data/helpers/tagDb');

// Add middleware
const router = express.Router();

// --------TAG---------
// GET method for tag
router.get('/', (req, res) => {
    tagDb
    .get()
    .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
 })
 
 // POST method for tag
 router.post('/', (req, res) => {
     const tagInfo = req.body;
 
     tagDb
     .insert(tagInfo)
     .then(response => {
         res.status(201).json({ tagInfo })
     })
     .catch(err => {
         res.status(500).json({ Error: err })
     })
 })
 
 // DELETE method for tag
 router.delete('/:id', (req, res) => {
     const id = req.params.id;
     let tagDeleted;
 
     tagDb
     .get(id)
     .then(tag => {
         tagDeleted = { ...tag }
     })
 
     tagDb
     .remove(id)
     .then(response => { 
         res.status(200).json({ tagDeleted })
     })
     .catch(err => {
         res.status(500).json({ Error: err })
     })
 })
 
 // PUT method for tag
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