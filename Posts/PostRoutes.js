const express = require('express'),
    db = require('../data/helpers/postDb'),
    router = express.Router();


router.get('/', (req, res) => {
    db
        .get()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    const { text, userID } = req.body
    console.log("fire")
    if (!text) {
        res.status(400).json("BAD REQUEST")
    } else {
        db
            .insert({ text, userID })
            .then(response => {
                console.log(response)
                db.get(response.id)
                    .then(post => {
                        res.json(post)
                    })
                    .catch(error => {
                        res.json(error)
                    })
            })
            .catch(error => {
                res.json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db
        .get(id)
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "YOU WILL NOT FIND THIS IN HERE! " })
            } else {
                db.remove(id)
                    .then(count => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    db
        .get(id)
        .then(result => {
            console.log(result)
            if (result) {
                res.json(result)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.put('/:id', (req, res) => {
    const { text } = req.body
    const id = req.params.id
    db
        .update(id, { text })
        .then(result => {
            if (result.length === 1) {
                db
                    .get(id)
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.json(error)
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})


module.exports = router; 