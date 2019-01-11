const express = require('express');

const dbu = require('../data/helpers/userDb.js');

const router = express.Router();


//middleware
function upper(req, res, next) {
    const user = req.body;
    req.body.name = user.name.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    next();
}

router.use(upper);
//endpoints when url begins
router.get('/', (req, res) => {
    dbu.get()
    .then(u =>{
        res.status(200).json({"users": u})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    dbu.get(id)
    .then(u =>{
        res.status(200).json({"users": u})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', upper, (req, res) => {
    const newUser = req.body;
    if(newUser.name){
        dbu.insert(newUser)
        .then(name => {
            res.status(201).json(name);
        })
        .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: 'error' })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    dbu.remove(id)
    .then(removal => {
        res.status(200).json(removal)
    })
    .catch(err => res.status(500).json(err))
})

router.put('/:id', upper, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    dbu.update(id, changes)
        .then(updated => {
            if (!updated){
                res.status(400).json({ message: "The post with the specified ID does not exist " })
            } else {
                res.status(200).json(updated)
            }
        })
})

module.exports = router;