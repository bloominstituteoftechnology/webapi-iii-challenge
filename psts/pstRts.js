const express = require('express');
const router = express.Router();

const pstdb = require('../data/helpers/postDb');

// router.get('/', (req, res) => {
//     pstdb
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
    pstdb
    .get(id)
    .then(pstidv => {
        if (!pstidv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(pstidv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post information could not be retrieved." });
    });
});

router.post('/', (req, res) => {
    const { userId, text  } = req.body;
    const nwPst = { userId, text };
    pstdb
    .insert(nwPst)
    .then(pstidf => {
        const { id } = pstidf;
        pstdb
        .get(id)
        .then(pstidv => {
            console.log(pstidv);
            if (!userId || !text) {
                return res.status(400).send({ errorMessage: "Please provide text for the post." });
            }
            res.status(201).json(pstidv)
        });
    })
    .catch(err => {
        res.status(500).send({ error: "There was an error while saving the post to the database" });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    const nwPst = { userId, text };
    console.log(nwPst);
    pstdb
    .update(id, nwPst)
    .then(pstidv => {
        console.log(pstidv);
        if (!pstidv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        if (!userId || !text) {
            return res.status(400).send({ errorMessage: "Please provide text for the post." });
        }
        res.status(200).json(pstidv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post information could not be modified." });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pstdb
    .remove(id)
    .then(pstrmv => {
        console.log(pstrmv);
        if (!pstrmv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(pstrmv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post could not be removed" });
    });
});

module.exports = router;