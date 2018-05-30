const express = require('express')

const router = express.Router()

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(result => {
            result.length ? res.json(result) : res.status(404).json({ error: "There are no Users present!" })
        })
        .catch(err => {
            res.status(500)(json({ error: "There was an error in the database!" }))
        })

})

server.get('/api/users/:id', (req, res) => {
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

module.exports = router; 