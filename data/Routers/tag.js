const express = require('express');

const router = express.Router()

const db = require('../helpers/tagDb');


router.get('/', (req, res)=> {

    db.get()
    .then(tags => {
        res.status(200).json(tags)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting tags list ", error ));
    })

})

router.get('/:id', (req, res)=> {
    const { id } = req.params;
    db.get(id)
    .then(tag => {
        res.status(200).json(tag)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting tag ", error ));
    })

})

router.post('/add', (req, res) => {
    const tag = req.body

    db.insert(tag)
    .then(tag=> {
        res.status(200).json(tag)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error posting tag ", error))
    })
})

router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const tag = req.body

    db.update(id, tag)
    .then(tagged => {
        res.status(200).json(tagged)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error updating tag", error))
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;
    
    db.remove(id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error deleting tag", error))
    })
})




module.exports = router;