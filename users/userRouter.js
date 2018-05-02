const express = require("express");
const userDb = require("../data/helpers/userDb.js");
const router = express.Router();


router.get('/users', (req, res) => {
    userDb.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be found"
        })
    })
})

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.get(id).then(user => {
        res.json(user);
    }).catch(err => {
        error: "The specified user could not be found"
    })
})

router.post('/users/', (req, res) => {
    newUser = req.body;
    userDb.insert(newUser).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: "There was en error posting a new user to the database"
        })
    })
})

router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userUpdate = req.body;

    userDb.update(id, userUpdate).then(response => {
        res.status(200).json({
            Sucess: "User has been updated"
        })
    }).catch(err => {
        res.status(500).json({
            error: "User update failed"
        })
    })
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id).then(response => {
        res.status(200).json({
            Deleted: "Post has been deleted from the database"
        })
    })
})



module.exports = router;