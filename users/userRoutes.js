const express = require('express')
const userDb = require('../data/helpers/userDb')
const router = express.Router()

router.get('/', (req, res) => {
    // console.log("fire")
    userDb.get()
        .then(result => {
            // console.log("fire")
            result.length ? res.json(result) : res.status(404).json({ error: "There are no Users present!" })
        })
        .catch(err => {
            res.status(500)(json({ error: "There was an error in the database!" }))
        })

})

// router.getUserPosts('/:id')

router.get('/:id', (req, res) => {
    const { id } = req.params
    if (id) {
        userDb.get(id)
            .then(result => {
                result.id ? res.json(result) : res.status(404).json({ error: "The User was not found!" })
            })
            .catch(err => {
                res.status(500)(json({ error: "There was an error in the database!" }))
            })
    } else {
        res.status(400).json({ error: 'Please include an id when calling from this URL' })
    }
})

router.put('/:id', (req, res) => {
    const { name } = req.body
    const id = req.params.id
    userDb
        .update(id, { name })
        .then(result => {
            // console.log(result)
            if (result) {
                userDb
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

router.delete('/:id', (req, res) => {
    const id = req.params.id
    userDb.get(id)
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "YOU WILL NOT FIND THIS IN HERE! " })
            } else {
                userDb.remove(id)
                    .then(count => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.stats(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            res.stats(500).json({ error: "The post information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    // console.log(req.body)
    const { name } = req.body
    if (name === undefined) {
        res.status(400).json("BAD REQUEST")
    } else {
        userDb
            .insert({ name })
            .then(response => {
                userDb.get(response.id)
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

module.exports = router; 