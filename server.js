const express = require("express");
const cors = require("cors");
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');
const port = 7777;
const server = express();

server.use(express.json());
server.use(cors());


// #################### Custom Middleware ####################

const sendUserError = (status, message, res) => {
    return res.status(status).json({ errorMessage: message });
}

const getResources = (helper, helperStr, req, res, altGetMethod) => {
    if (!req) {
        helper.get()
            .then(get_response => {
                if (get_response.length === 0) {
                    return sendUserError(404, `There are no ${helperStr} in the database.`, res);
                }
                else {
                    res.json(get_response);
                }
            })
            .catch(error => {
                sendUserError(500, `The ${helperStr} information could not be retrieved or does not exist.`, res);
            })
    }
    else if (req && !altGetMethod) {
        const { id } = req.params;
        helper.get(id)
            .then(get_response => {
                if (!get_response) {
                    return sendUserError(404, `The ${helperStr} with the specified ID does not exist.`, res);
                }
                else {
                    res.json(get_response);
                }
            })
            .catch(error => {
                sendUserError(500, `The ${helperStr} information could not be retrieved or does not exist.`, res);
            })
    }
    else {
        const { id } = req.params;
        altGetMethod(id)
            .then(altGetMethod_response => {
                if (altGetMethod_response.length === 0) {
                    return sendUserError(404, `There are no ${helperStr[0]} for the specified ${helperStr[1]} ID.`, res);
                }
                else {
                    res.json(altGetMethod_response);
                }
            })
            .catch(error => {
                sendUserError(500, `The ${helper[1]}'s ${helper[0]} could not be retrieved or does not exist.`, res);
            })
    }
}

const postResources = (helper, helperStr, req, res) => {
    let obj = {};

    if (helperStr === 'users') {
        const { name } = req.body;

        if (!name) {
            return sendUserError(404, 'Please provide a name for the user.', res);
        }
        obj.name = name;
    }
    else if (helperStr === 'posts') {
        const { text, userId } = req.body;

        if (!text || !userId) {
            return sendUserError(404, 'Please provide text and the user ID for the post.', res);
        }

        obj.text = text;
        obj.userId = userId;
    }

    helper.insert(obj)
        .then(insert_response => {
            helper.get(insert_response.id)
                .then(get_response => {
                    if (!get_response) {
                        return sendUserError(404, `The ${helperStr.slice(0, -1)} with the specified ID does not exist.`, res);
                    }
                    else {
                        res.json(get_response);
                    }
                })
                .catch(error => {
                    sendUserError(500, `The ${helperStr.slice(0, -1)} information could not be retrieved.`, res);
                })
        })
        .catch(error => {
            sendUserError(500, `There was an error while saving the ${helperStr.slice(0, -1)} to the database.`, res);
        })
}

const putResources = (helper, helperStr, req, res) => {
    let obj = {};
    const { id } = req.params;

    if (helperStr === 'users') {
        const { name } = req.body;

        if (!name) {
            return sendUserError(404, 'Please provide a name for the user.', res);
        }
        obj.name = name;
    }
    else if (helperStr === 'posts') {
        const { text, userId } = req.body;

        if (!text || !userId) {
            return sendUserError(404, 'Please provide text and the user ID for the post.', res);
        }

        obj.text = text;
        obj.userId = userId;
    }

    helper.update(id, obj)
        .then(update_response => {
            if (update_response === 0) {
                return sendUserError(404, `The ${helperStr.slice(0, -1)} with the specified ID does not exist.`, res)
            }
            else {
                helper.get(id)
                    .then(get_response => {
                        res.json(get_response);
                    })
                    .catch(error => {
                        sendUserError(404, `The ${helperStr.slice(0, -1)} with the specified ID does not exist.`, res);
                    })
            }
        })
        .catch(error => {
            sendUserError(500, `The ${helperStr.slice(0, -1)} information could not be modified.`, res);
        })
}

const deleteResources = (helper, helperStr, req, res) => {
    let obj = {};
    let del = {};
    const { id } = req.params;

    helper.get(id)
        .then(get_response => {
            del = get_response;
            helper.remove(id)
                .then(remove_response => {
                    if(remove_response === 0) {
                        return sendUserError(404, `The ${helperStr} with the specified ID does not not exist.`, res); 
                    }
                    else {
                        res.json(del); 
                    }
                })
                .catch(error => {
                    sendUserError(500, `The ${helperStr} information could not be removed.`, res); 
                })  
        })
        .catch(error => {
            sendUserError(404, `The ${helperStr} with the specified ID does not exist.`, res);
        })
}

// #################### Endpoints ####################

server.get('/api/users', (req, res) => {
    getResources(users, 'users', null, res, null);
});

server.get('/api/users/:id', (req, res) => {
    getResources(users, 'user', req, res, null)
});

server.get('/api/users/:id/posts', (req, res) => {
    getResources(users, ['posts', 'user'], req, res, users.getUserPosts)
});

server.get('/api/posts/', (req, res) => {
    getResources(posts, 'posts', null, res, null);
});

server.get('/api/posts/:id', (req, res) => {
    getResources(posts, 'post', req, res, null);
});

server.get('/api/posts/:id/tags', (req, res) => {
    getResources(posts, ['tags', 'post'], req, res, posts.getPostTags);
});

server.post('/api/users/', (req, res) => {
    postResources(users, 'users', req, res)
});

server.post('/api/posts/', (req, res) => {
    postResources(posts, 'posts', req, res);
});

server.put('/api/users/:id', (req, res) => {
    putResources(users, 'users', req, res);
});

server.put('/api/posts/:id', (req, res) => {
    putResources(posts, 'posts', req, res);
});

server.delete('/api/users/:id', (req, res) => {
    deleteResources(users, 'user', req, res);
});

server.delete('/api/posts/:id', (req, res) => {
    deleteResources(posts, 'post', req, res);
});


server.listen(port, () => console.log(`Server is running on port ${port}.`));