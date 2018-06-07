const users = require('./helpers/userDb.js');
const posts = require('./helpers/postDb.js');
const tags = require('./helpers/tagDb.js');
const express = require('express');
const cors = require('cors');

const port = 5865;
const server = express();
server.use(express.json());
server.use(cors.json());


// User Endpoints
server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({
                users
            })
        })
        .catch(error => {
            res.status(500)
            res.json({
                message: "The user information could not be retrieved."
            })
        });
});

server.get('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    if (req.params.id == undefined) {
        res.status(404)
        res.json({
            message: "The user with the specified ID does not exist."
        })
    } else {
        console.log(id);
        users
            .get(id)
            .then(post => {
                res.json({
                    post
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The user information could not be retrieved."
                })
            })
    }
});

server.post('/api/users', (req, res) => {
    const {
        name
    } = req.body;
    if (name == undefined) {
        user.status(404)
        user.json({
            message: "The user must have have a name."
        })
    } else {
        users
            .insert({
                name
            })
            .then(user => {
                res.json({
                    user
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The user information could not be added."
                });
            });
    }
});

server.put('/api/users/:id', (req, res) => {
    const {
        text,
        userId
    } = req.body;
    const {
        id
    } = req.params;
    posts
        .update(req.params.id, req.body)
        .then(post => {
            if (!post) {
                res.status(404);
                res.json({
                    message: "The user with the specified ID does not exist."
                })
            } else {
                res.json({
                    post
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The user information could not be modified."
            });
        })
});
server.delete('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    users
        .remove(id)
        .then(user => {
            if (!user) {
                res.status(404);
                res.json({
                    message: "The user with the specified ID does not exist."
                })
            } else {
                res.json({
                    user
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The user could not be removed"
            })
        })
})
server.get('/api/users/:id/posts', (req, res) => {
    const {
        id
    } = req.params;
    users
        .getUserPosts(id)
        .then(posts => {
            if (posts.length == undefined) {
                res.status(404)
                res.json({
                    message: "No user posts found."
                })
            } else {
                res.json({
                    posts
                });
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The user posts information could not be retrieved."
            })
        })
})

//Posts Endpoints
server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json({
                posts
            })
        })
        .catch(error => {
            res.status(500)
            res.json({
                message: "The posts information could not be retrieved."
            })
        })
})
server.get('/api/posts/:id', (req, res) => {
    const {
        id
    } = req.params;
    if (req.params.id == undefined) {
        res.status(404)
        res.json({
            message: "The post with the specified ID does not exist."
        })
    } else {
        posts
            .get(id)
            .then(post => {
                res.json({
                    post
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The post information could not be retrieved."
                })
            })
    }
})
server.post('/api/posts', (req, res) => {
    const {
        text,
        userId
    } = req.body;
    if (text == undefined || userId == undefined) {
        user.status(404)
        user.json({
            message: "The post with the specified ID does not exist."
        })
    } else {
        posts
            .insert({
                text,
                userId
            })
            .then(post => {
                res.json({
                    post
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The post information could not be added."
                })
            })
    }
})
server.put('/api/posts/:id', (req, res) => {
    const {
        text,
        userId
    } = req.body;
    const {
        id
    } = req.params;
    posts
        .update(req.params.id, req.body)
        .then(post => {
            if (!post) {
                res.status(404);
                res.json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.json({
                    post
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The post information could not be modified."
            });
        })
})
server.delete('/api/posts/:id', (req, res) => {
    const {
        id
    } = req.params;
    posts
        .remove(id)
        .then(post => {
            if (!post) {
                res.status(404);
                res.json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.json({
                    post
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The post could not be removed."
            })
        })
})
server.get('/api/posts/:id/tags', (req, res) => {
    const {
        id
    } = req.params;
    posts
        .getPostTags(id)
        .then(tag => {
            if (tag.length == undefined) {
                res.status(404)
                res.json({
                    message: "No post tags found."
                })
            } else {
                res.json({
                    tag
                });
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The post tag information could not be found."
            })
        })
})


//Tags EndPoints
server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json({
                tags
            })
        })
        .catch(error => {
            res.status(500)
            res.json({
                message: "The tags information could not be retrieved."
            })
        })
})
server.get('/api/tags/:id', (req, res) => {
    const {
        id
    } = req.params;
    if (req.params.id == undefined) {
        res.status(404)
        res.json({
            message: "The tag with the specified ID does not exist."
        })
    } else {
        tags
            .get(id)
            .then(tag => {
                res.json({
                    tag
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The tag information could not be retrieved."
                })
            })
    }
})
server.post('/api/tags', (req, res) => {
    const {
        tag
    } = req.body;
    if (tag == undefined) {
        user.status(404)
        user.json({
            message: "The tag with the specified ID does not exist."
        })
    } else {
        tags
            .insert({
                tag
            })
            .then(tag => {
                res.json({
                    tag
                })
            })
            .catch(error => {
                res.status(500)
                res.json({
                    message: "The tag information could not be added."
                })
            })
    }
})
server.put('/api/tags/:id', (req, res) => {
    const {
        tag
    } = req.body;
    const {
        id
    } = req.params;
    tags
        .update(req.params.id, req.body)
        .then(tag => {
            if (!tag) {
                res.status(404);
                res.json({
                    message: "The tag with the specified ID does not exist."
                })
            } else {
                res.json({
                    tag
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The tag information could not be modified."
            });
        })
})
server.delete('/api/tags/:id', (req, res) => {
    const {
        id
    } = req.params;
    tags
        .remove(id)
        .then(tag => {
            if (!tag) {
                res.status(404);
                res.json({
                    message: "The tag with the specified ID does not exist."
                })
            } else {
                res.json({
                    tag
                })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({
                error: "The tag could not be removed."
            })
        })
})




server.listen(port, () => console.log(`Server running on port ${port}`));