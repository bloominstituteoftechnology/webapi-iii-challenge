const express = require('express');
const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// POST METHOD

router.post('/', (req, res) => {
    const newtag = req.body;

    if (!newTag.tag || newTag.tag.length < 1 || newTag.tag.length > 80) {
        userError(400, "tag must be between 1 and 80 characters", res);
        return;
    }
    tagDb
        .insert(newTag)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            userError(500, "SOMETHING IS WRONG", res);
        })
});

// GET METHOD

router.get('/', (req, res) => {
    tagDb
        .get()
        .then(tags => {
            res.json(tags)
        })
        .catch(error => {
            userError(500, 'Somethings wrong', res);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    tagDb
    .get(id)
    .then(tag => {
        if (tag) {
            res.json(req.body.tags);
        } else {
            userError(404, "tags not found", res);
            return;
        }
    })
    .catch(error => {
        userError(500, "Somethings wrong", res);
    });
});

// DELETE METHOD

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    tagDb
        .get(id)
        .then(tag => {
            tagDb
                .remove(id)
                .then(result => {
                    if (result) {
                        res.json(destroy);
                    } else {
                        userError(404, "Cannot find tags", res)
                    }
                })
                .catch(error => {
                    userError(500, "Somethings wrong", res)
                })
        })
})

// PUT METHOD

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if(!update.tag || update.tag.length < 0 || update.tag.length > 80) {
        userError(400, "Please add user ID and text to post", res)
    }else {
        tagDb
        .update(id, update)
        .then( result => {
            if( result === 0) {
                sendError(404, "Cannot find tag", res);
                return;
            } else {
                res.json(udpate);
            }
        })
        .catch(error => {
            userError(500, "somethings wrong", res)
        });
    };
});



module.exports = router;