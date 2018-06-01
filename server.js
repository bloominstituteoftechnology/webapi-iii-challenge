//node modules
const express = require('express');
// const cors = require('cors');

//database helpers
const postDB = require('./data/helpers/postDB.js')
const tagDB = require('./data/helpers/tagDb.js')
const userDB = require('./data/helpers/userDb')


// database helpers
const port = 5555;
const server = express();
server.use(express.json())
// server.use(cors({ origin: 'http://localhost:3000' }))

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.get('/', (req, res) => {
    res.send('Please work, website.')
});
server.get('/api/users', (req, res) => {
    userDB
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved", res)
        })
})
server.get('/api/posts', (req, res) => {
    postDB
        .get()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved", res)
        })
})
server.get('/api/tags', (req, res) => {
    tagDB
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(error => {
            sendUserError(500, "The tag information could not be retrieved", res)
        })
})
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    postDB
        .get(id)
        .then(posts => {
            if (posts) {
                res.json({ posts })
            } else {
                sendUserError(404, "The post with the specified ID does not exist", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
        })
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDB
        .get(id)
        .then(user => {
            if (user) {
                res.json({ user })
            } else {
                sendUserError(404, "The user with the specified ID does not exist", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved.", res)
        })
})
server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params
    userDB
        .getUserPosts(id)
        .then(posts => {
            if (posts.length > 0) {
                res.json({ posts })
            } else {
                sendUserError(404, "The specified user does not exist", res)
            }
        })
        .catch(erorr => {
            sendUserError(500, "The posts could not be retrieved.", res)
        })
})
server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params
    tagDB
        .get(id)
        .then(tag => {
            if (tag) {
                res.json({ tag })
            } else {
                sendUserError(404, "The tag with the specified ID does not exist", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The tag information could not be retrieved.", res)
        })
})
server.get('/api/posts/:id/tags', (req, res) => {
    const { id } = req. params;
    postDB
        .getPostTags(id)
        .then(tag => {
            if (tag.length > 0) {
                res.json({ tag })
            } else {
                sendUserError(404, "This tag does not exist", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The tags could not be retrieved.", res)
        })
})
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        sendUserError(400, "Please provide name for the user.", res)
    } else {
        userDB
            .insert({ name })
            .then(response => {
                res.status(201);
                res.json({ response })
            })
            .catch(error => {
                sendUserError(500, "There was an error saving the user to the database", res)
            })
    }
})
server.post('/api/posts', (req, res) => {
    const { userID, text } = req.body;
    if (!text || !userID) {
        sendUserError(400, "Please provide text and a userID for the post.", res)
    } else {
        postDB
            .insert({ userID, text })
            .then(response => {
                res.status(201);
                res.json({ response })
            })
            .catch(error => {
                sendUserError(500, "There was an error while saving the post to the database.", res)
            })
    }
})
server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        sendUserError(400, "Please provide tag for the tag.", res)
    } else {
    tagDB
        .insert({ tag })
        .then(response => {
            res.status(201)
            res.json({ response })
        })
        .catch(error => {
            sendUserError(500, "There was a error while saving the tag.", res)
        })}
})
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userDB
        .get(id)
        .then(user => {
        if (!user) {
            sendUserError(404, "The user with the specified ID does not exist", res)
        } else {
    userDB
        .update(id, { name })
        .then(user => {
            if (!name) {
                sendUserError(400, "Please provide a name for the user.", res)
            } else {
                userDB
                    .get(id)
                    .then(user => {
                        res.json({ user })
                    });
        }})
        .catch(error => {
            sendUserError(500, "The user information could not be modified.", res)
        })
    }})
})
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { userID, text } = req.body;
    postDB
        .update(id, { userID, text})
        .then(post => {
            if (!userID || !text) {
                sendUserError(400, "Please provide a userID and text.", res)
            } else if (post === 0) {
                sendUserError(404, "The post with the specified ID could not be found", res)
            } else {
                postDB
                    .get(id)
                    .then(post => {
                        res.json({ post })
                    });
            }})
            .catch(error => {
                sendUserError(500, "The post information could not be modified.", res)
            })
})
server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    tagDB 
        .update(id, { tag })
        .then(tags => {
            if (!tag) {
                sendUserError(400, "Please provide a tag.", res)
            } else if (!tags) {
                sendUserError(404, "The tag with the specified ID could not be found.", res)
            } else {
                tagDB
                    .get(id)
                    .then(tags => {
                        res.json({ tags })
                    });
            }})
            .catch(error => {
                sendUserError(500, "The tag information could not be modified.", res)
            })

})
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let deletedUser;
    let deletedUserPosts;
    userDB
        .get(id)
        .then((user) => deletedUser = user)
    userDB
        .getUserPosts(id)
        .then((postsByUser) => deletedUserPosts = postsByUser)
        .catch(error => {
            sendUserError(500, "The tags of the post could not be removed.")
        })   
    userDB
        .remove(id, deletedUserPosts)
        .then(user => {
            if (user === 0) {
                sendUserError(404, "The user with the specified ID does not exist.", res)
            } else {
                res.json({ deletedUser });
            }})
            .catch(error => {
                sendUserError(500, "The user could not be removed", res)
            })
});
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let deletedPost;
    let deletedPostTags;
    postDB
        .get(id)
        .then((post) => deletedPost = post)
    postDB
        .getPostTags(id)
        .then((postTag) => deletedPostTags = postTag)
    postDB
        .remove(id, deletedPostTags)
        .then(postRemoved => {
            if (postRemoved === 0) {
                return sendUserError(404, "No post was found with that specific ID.", res)
            } else {
                res.json({ success: 'Post removed' })
            }})
            .catch(error => {
                return sendUserError(500, "There was an error deleting the post from the database.", res)
            })
});
server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tagDB
        .remove(id)
        .then(removedTag => {
            if (removedTag === 0) {
                return sendUserError(404, "No tag was found with that specific ID.", res)
            } else {
                res.json({ success: 'Tag removed' })
        }})
        .catch(error => {
            return sendUserError(500, "There was an error deleting the tag from the database.", res)
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`));