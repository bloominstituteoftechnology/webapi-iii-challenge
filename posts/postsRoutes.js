const express = require('express');
const router = express.Router();
const postsModel = require('./postsModel.js');

router.get('/', (req, res) => {
    postsModel.get()
        .then(data => {
            res.status(200).json({ message: data })
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to grab user list.' })
        })
});

router.post('/', (req, res) => {
    let { name } = req.params;
    postsModel.insert(name)
        .then(data => {
            res.status(201).json({ message: 'Made a new user.' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to create a new user.' })
        });
});

router.put('/:id', (req, res) => {
    let { id } = req.params;
    postsModel.udpate(id, req.params)
        .then(data => {
            res.status(200).json({ message: `${data} updated.` })
        })
        .catch(err => {
            res.status(500).json({ message: 'Unalbe to update user name' })
        });
});

router.delete('/:id', (req, res) => {
    let { id } = req.params;
    postsModel.remove(id)
        .then(data => {
            res.status(204).json({ message: 'User deleted.' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to delete user.' })
        });
});

module.exports = router;
