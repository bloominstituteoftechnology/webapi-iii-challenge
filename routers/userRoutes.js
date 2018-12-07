const express = require('express');
const userDB = require('../data/helpers/userDb');
const router = express.Router();


const middleware = (req, res, next) => {
    const name = req.body.name;
    if (name) {
        req.body.name = req.body.name.toUpperCase();
    }
    next();
}

router.use(middleware);

router.get('/', (req, res) => {
    userDB.get()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    message: "unable to find users"
                })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDB.get(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: "user not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "failed to get user"
            })
        })
})

router.post('/', (req, res) => {
    const newUser = req.body;
    userDB.insert(newUser)
        .then(id =>
            userDB.get(id.id)
        )
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: "add user failed"
            })
        })
});

router.delete('/', (req, res) => {
    const id = req.query.id;
    userDB.remove(id)
        .then(num => {
            if (num) {
                res.json({
                    message: "user deleted"
                })
            } else {
                res.status(404).json({
                    message: "id not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "could not delete user"
            })
        })
})



module.exports = router;