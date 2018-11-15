const express = require('express');
const user = require('../../data/helpers/userDb');
const router = express.Router();

const nameUppercase = (req, res, next) => {
    let { name } = req.body;
    name = name.toUpperCase();
    res.json(name);
    next();
}

router.get('/', (req, res) => {
    user.get()
    .then(foundUser => {
        res.json(foundUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
}),
router.get('/:id', (req, res) => {
    const { id } = req.params;
    user.get(id)
    .then(foundUser => {
        res.json(foundUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.post('/', nameUppercase, (req, res) => {
    const { name } = req.body;
    user.insert({ name })
    .then(newUser => {
        res.json(newUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const name = req.body;
    user.update(id, name)
    .then(count => {
        res.json(count)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    user.remove(id)
    .then(count => {
        res.json(count)
    })
    .catch( err => {
        if(!id) {
            res.json({ message: "id needed"})
        } else {
            res.json({ message: err })
        }
    })
});


module.exports = router;