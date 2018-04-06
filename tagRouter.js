const tagRouter = require('express').Router();

const tagDb = require('./data/helpers/tagDb');

tagRouter.get('/', (req, res) => {
    tagDb.get().then(tags => {
        res.json(tags);
    }).catch(error => {
        res.status(500).json({error: "The tags could not be retrieved."});
    })
});

tagRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    tagDb.get(id).then(tag => {
        res.json(tag);
    }).catch(error => {
        res.status(500).json({error: "This tag could not be retrieved."})
    })
});


tagRouter.post('/', (req, res) => {
    const tag = req.body;

    if(tag.length > 80) {
        res.status(400).json({ messge: 'Tags may not be longer than 80 characters.' })
        return;
    }
    
    tagDb.insert(tag).then(response => {
        res.json({ ...response, ...tag});
    }).catch(error => {
        res.status(500).json(error);
    })
});

tagRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    tagDb
        .get(id)
        .then(response => {
            const tag = response;
            if(!tag) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." });
                return;
            }
        tagDb
            .remove(id)
            .then(response => {
                res.json(user);
            })
            .catch(error => {
                res.status(500).json({ error: "The tag could not be removed" });
            });
    })
    .catch(error => {
        res.status(500).json({ error: "The user tag not be removed" });
    })
});

tagRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    tagDb
        .get(id)
        .then(response => {
            if(!response) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." });
                return;
            }
        tagDb
            .update(id, req.body)
            .then(id => {   
                tagDb
                    .get(id)
                    .then(newPost => {
                        res.status(200).json(NewPost);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The new tag could not be retrieved, but I'm pretty sure it was updated." })
                    })
            })
            .catch(error => {
                res.status(500).json({ error: "The tag could not be removed." });
            });
    })
    .catch(error => {
        res.status(500).json({ error: "The tag could not be removed." });
    });
});

module.exports = tagRouter;