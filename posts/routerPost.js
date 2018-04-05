const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req,res) => {
    db
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(error => console.error(error));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db
    .get(id)
    .then(post => {
        if (post === undefined) {
            res.status(400).json({ error: `Post with id ${id} not found.`})
        } else {
            res.status(200).json(post);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be retrieved." });
    });
})

router.get('/:id/tags', (req, res) => {
    const { id } = req.params;
    db.getPostTags(id).then(tags => res.json(tags)).catch(error => console.error(error));
})

router.post('/', (req, res) => {
    const post = req.body;
    if (post.text === undefined || post.text !== 'string' || typeof post.userId !== 'number') res.status(400).json({ error: "Post text (string) and userId (number) fields are required."})
    db
    .insert(post)
    .then(newID => {
        db
        .get(newID.id)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(error => res.status(500).json({ error: "Added post could not be retrieved."}));
    })
    .catch(error =>  res.status(500).json({ error: "Post could not be added to database." }));
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
   
    if (post.text === undefined || typeof post.text !== 'string' || typeof post.userId !== 'number') res.status(400).json({ error: "Post text (string) and userId (number) fields are required."})
    db
    .update(id, post)
    .then(count => {
        db.get(id).then(post => res.status(200).json(post)).catch(error => console.error(error))
    })
    .catch(error => res.status(500).json({ error: `post with id ${id} could not be updated.` }));

})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
    .then(deletions => {
        if (deletions === 1) {
            res.status(200).json({ success: `post with id ${id} was deleted.`})
        } else {
            res.status(404).json({ error: `post with id ${id} was not found.`})
        }
    })
    .catch(error => res.status(500).json({ error: `post with id ${id} could not be deleted.` }))
})


module.exports = router;