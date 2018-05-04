const express = require('express');
const router = express.Router();
const db = require('./data/helpers/tagDb');



router.get('/', (req, res) => {
    db
        .get()
        .then(p => {
            res.json(p)
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db
        .get(id)
        .then(pId => {
            if (pId.length === 0) {
                res.status(404).json({ msg: " user not found" })
            }
            else {
                res.status(200).json(pId)
            }
        })
        .catch(err => {
            res.status(404).json({
                msg: "user not found"
            })
        })
})

router.post('/', (req, res) => {
    const obj = { tag: req.body.tag }

    db
        .insert(obj)
        .then(p => {
            res.status(200).json({ msg: ' a new user is  added' })
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

router.put('/:id', (req, res) => {
    const obj = {
        tag: req.body.tag

    }

    const { id } = req.params
    db
        .update(id, obj)
        .then(p => {
            if (obj.text !== '' && obj.userId !== '') {
                res.status(200).json({ msg: 'user is updated' })
            }
        })
        .catch(err => {
            res.status(404).json({
                msg: " user not found"
            })
        })

})


router.delete("/:id", (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(p => {
            res.status(200).json({
                msg: ` the user with  id:"${id}" is deleted`
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'user not found '
            })
        })

})
module.exports = router;