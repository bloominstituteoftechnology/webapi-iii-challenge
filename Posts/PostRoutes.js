const express = require('express'),
    db = require('../data/helpers/postDb'),
    router = express.Router();
tagDb = require('../data/helpers/tagDb')


router.get('/', (req, res) => {
    db
        .get()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    let { text, userId } = req.body
    // console.log("fire")
    // tags === undefined ? tags = [] : tags;
    if (!text) {
        res.status(400).json("BAD REQUEST")
    } else {
        db
            .insert({ text, userId })
            .then(response => {
                console.log(response)
                db.get(response.id)
                    .then(post => {
                        res.json(post)
                    })
                    .catch(error => {
                        res.json(error)
                    })
            })
            .catch(error => {
                res.json({ error: `${error}` })
            })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db
        .get(id)
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "YOU WILL NOT FIND THIS IN HERE! " })
            } else {
                db.remove(id)
                    .then(count => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    db
        .get(id)
        .then(result => {
            if (result) {
                db.getPostTags(id)
                    .then(tags => {
                        let obj = {
                            post: result,
                            tags: tags
                        }
                        res.json(obj)
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.put('/:id', (req, res) => {
    const { text } = req.body
    const id = req.params.id
    db
        .update(id, { text })
        .then(result => {
            if (result) {
                db
                    .get(id)
                    .then(result => {
                        db.getPostTags(id)
                            .then(tags => {
                                let obj = {
                                    post: result,
                                    tags: tags
                                }
                                res.json(obj)
                            })
                            .catch(error => {
                                res.json(error)
                            })
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})


module.exports = router; 