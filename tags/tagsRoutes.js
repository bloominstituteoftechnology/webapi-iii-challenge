const express = require('express');

const tagDb = require('../data/helpers/tagDb');

const router = express.Router();


router.get('/', (req, res) => {

    tagDb.get()
        .then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(500).send({error: `Problem getting tabs from database`})
    })
});

router.get('/:id', (req, res) => {

    const {id} = req.params;
    tagDb.get(id)
        .then((response) => response.length === 0
            ? res.status(404).send({error: `Tag not found`})
            : res.status(200).send(response.data))
        .catch((error) => {
            res.status(500).send({error: `Error getting Tags from the database`})
        })
});


router.post('/', (req, res) => {
    const tag = req.body.tag;

    if (!tag) {
        res.status(400).send({error: 'Please provide a name for the tag'});
    }

    tagDb.insert(req.body).then(tag => {
        res.status(200).send(req.body)
    }).catch(err => {
        res.status(500).send({error: 'There was a error while saving to tag to database'});
    })
});

router.put('/:id', (req, res) => {

    let id = req.params.id;
    if (req.body) {
        tagDb.update(id, req.body)
            .then((response) => response === 0
                ? res.status(404).send({ error: `Tag with id ${id} not found: ${response}` })
                : res.status(200).send({ message: `Tag with id ${id} updated` }))
            .catch(() => res.status(500).send({ error: `Error updating tag with id ${id} ` }))
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

   tagDb.remove(id)
        .then((response) => response === 0
            ? res.status(404).send({ error: `Tag with id ${id} not found` })
            : res.status(200).send({ message: `Tag with id ${id} deleted` }))
        .catch(err => {
        }).catch(err => {
        res.status(500).send({error: 'problem'});
    })
});

module.exports = router;