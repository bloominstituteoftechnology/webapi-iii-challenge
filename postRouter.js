const postRouter = require('express').Router();

const postDb = require('./data/helpers/postDb');

postRouter.get('/', (req, res) => {
    postDb.get().then(posts => {
        res.json(posts);
    }).catch(error => {
        res.status(500).json({error: "The posts could not be retrieved."});
    })
});

postRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id).then(post => {
        res.json(post);
    }).catch(error => {
        res.status(500).json({error: "This post could not be retrieved."})
    })
});

postRouter.post('/', (req, res) => {
    postDb.insert(req.body).then(response => {
        res.json({ ...response, ...req.body});
    }).catch(error => {
        res.status(500).json(error);
    })
});

postRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb
        .get(id)
        .then(response => {
            const post = response;
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
        postDb
            .remove(id)
            .then(response => {
                res.json(user);
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed" });
            });
    })
    .catch(error => {
        res.status(500).json({ error: "The user post not be removed" });
    })
});

postRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    postDb
        .get(id)
        .then(response => {
            if(!response) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
        postDb
            .update(id, req.body)
            .then(id => {   
                postDb
                    .get(id)
                    .then(newPost => {
                        res.status(200).json(NewPost);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The new post could not be retrieved, but I'm pretty sure it was updated." })
                    })
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed." });
            });
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed." });
    });
});

module.exports = postRouter;