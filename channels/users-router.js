const router = require('express').Router()

const users = require('../users/userDb')


// middleware functions

function logger(req, res, next) {
    console.log(`you made a ${req.method} to ${req.url} on ${Date()}`)
    next()
}

function validateUserId(req, res, next) {
    const id = req.params.id
    users.getById(id)
        .then(result => {
            if (result) {
                req.user = req.body
                next()
            } else {
                res.status(400).json({ message: 'invalid user id'})
            }
        })
}

function validateUser(req, res, next) {
    console.log(req.body)

    if (!req.body) {
        res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing required name field' })
    } else {
        next()
    }
}


router.use(logger);


// user CREATE

router.post('/', validateUser, (req, res) => {
    const newUser = req.body

    users.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error creating a user' })
        })
})


// user READ

router.get('/', (req, res) => {
    users.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was a problem retrieving users' })
        })

})


// user UPDATE

router.put('/:id', validateUserId, (req, res) => {
    const userId = req.params.id
    const changes = req.user
    console.log(userId)

    users.update(userId, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error updating user name' })
        })
})


// user DELETE

router.delete('/:id', validateUserId, (req, res) => {
    const userId = req.params.id

    users.remove(userId)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error deleting user' })
        })
})


module.exports = router