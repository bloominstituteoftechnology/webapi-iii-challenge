const express = require('express');
const router = express.Router();

const usrdb = require('../data/helpers/userDb');

// router.get('/', (req, res) => {
//     usrdb
//     .find()
//     .then(pts => {
//         res.status(200).json(pts);
//     })
//     .catch(err => {
//         res.status(500).send({ error: "The posts information could not be retrieved." });
//     });
// });

router.get('/:id', (req, res) => {
    const { id } = req.params;
    usrdb
    .get(id)
    .then(usridv => {
        if (!usridv) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." });
        }
        res.status(200).json(usridv);
    })
    .catch(err => {
        res.status(500).send({ error: "The user information could not be retrieved." });
    });
});

router.get('/:id/psts', (req, res) => {
    const { id } = req.params;
    usrdb
    .getUserPosts(id)
    .then(usridv => {
        if (!usridv) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." });
        }
        res.status(200).json(usridv);
    })
    .catch(err => {
        res.status(500).send({ error: "The user information could not be retrieved." });
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const nwUsr = { name };
    usrdb
    .insert(nwUsr)
    .then(usridf => {
        const { id } = usridf;
        usrdb
        .get(id)
        .then(usridv => {
            console.log(usridv);
            if (!name) {
                return res.status(400).send({ errorMessage: "Please provide a name for the user." });
            }
            res.status(201).json(usridv)
        });
    })
    .catch(err => {
        res.status(500).send({ error: "There was an error while saving the user to the database" });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const nwUsr = { name };
    console.log(nwUsr);
    usrdb
    .update(id, nwUsr)
    .then(usridv => {
        console.log(usridv);
        if (!usridv) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." });
        }
        if (!name) {
            return res.status(400).send({ errorMessage: "Please provide a name for the user." });
        }
        res.status(200).json(usridv);
    })
    .catch(err => {
        res.status(500).send({ error: "The user information could not be modified." });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    usrdb
    .remove(id)
    .then(usrrmv => {
        console.log(usrrmv);
        if (!usrrmv) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." });
        }
        res.status(200).json(usrrmv);
    })
    .catch(err => {
        res.status(500).send({ error: "The user could not be removed" });
    });
});

module.exports = router;