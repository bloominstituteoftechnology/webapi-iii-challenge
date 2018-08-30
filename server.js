const express = require('express');
const cors = require('cors');
const port = 5000;
const server = express();

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
};

// Users API

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json( users );
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if(user.length === 0) {
                return sendUserError(404, `The user with the ID ${id} does not exist.`, res);
            }
            res.json(user);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    users
        .getUserPosts(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The user with the ID ${id} does not exist.`, res);
            }
            res.json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return sendUserError(400, `Must provide a name for the user`, res);
    }
    users
        .insert({name})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return sendUserError(400, `User must have a name`, res);
    }
    users
        .update(id, {name})
        .then(user => {
            if(user.length === 0) {
                return sendUserError(404, `The user with the ID ${id} does not exist.`, res);
            }
            users
                .get(id)
                .then(user => {
                    res.json({user});
                })
                .catch(error => {
                    return sendUserError(500, `There was an error processing your request`, res);
                })
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The user with the ID ${id} does not exist.`, res);
            }
            res.json({ success: `User with ID ${id} removed`});
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});






// Posts API

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/posts/:id/tags', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if(post === 0) {
                return sendUserError(404, `The post with the ID ${id} does not exist`, res);
            }
        })
        posts
            .getPostTags(id)
            .then(tags => {
                if(tags.length === 0) {
                    return sendUserError(404, `The post with the ID ${id} has no tags.`, res);
                }
                res.json(tags);
            })
            .catch(error => {
                return sendUserError(500, `There was an error processing your request`, res);
            });
});

server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if(!text || !userId) {
        return sendUserError(400, `Must provide a userId and text for a new post`, res);
    }
    posts
        .insert({text, userId})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        return sendUserError(400, `Post must have text`, res);
    }
    posts
        .update(id, {text})
        .then(post => {
            if(post === 0) {
                return sendUserError(404, `The post with the ID ${id} does not exist.`, res);
            }
            posts
                .get(id)
                .then(post => {
                    res.json(post);
                })
                .catch(error => {
                    return sendUserError(500, `There was an error processing your request`, res);
                })
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The post with the ID ${id} does not exist.`, res);
            }
            res.json({ success: `Post with ID ${id} removed`});
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});







// Tags API

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .get(id)
        .then(tag => {
            if (tag === undefined) {
                return sendUserError(404, `The tag with the ID ${id} does not exist.`, res);
            }
            res.json(tag);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if(!tag) {
        return sendUserError(400, `Must provide tag text for a new tag`, res);
    }
    tags
        .insert({tag})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    if (!tag) {
        return sendUserError(400, `The tag must have text`, res);
    }
    tags
        .update(id, {tag})
        .then(tag => {
            if(tag === 0) {
                return sendUserError(404, `The tag with the ID ${id} does not exist.`, res);
            }
            tags
                .get(id)
                .then(tag => {
                    res.json(tag);
                })
                .catch(error => {
                    return sendUserError(500, `There was an error processing your request`, res);
                })
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .remove(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The tag with the ID ${id} does not exist.`, res);
            }
            res.json({ success: `Tag with ID ${id} removed`});
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});




server.listen(port, () => console.log(`Server is running on port ${port}`));