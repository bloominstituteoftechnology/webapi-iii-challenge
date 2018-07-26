const express = require('express');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');

const port = 8000;
const server = express();
server.use(express.json());
server.use(cors());

//User endpoints

//List of users
server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The user information could not be retrieved." })
    });
});

//Get user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404);
        res.json({ error: "That user ID does not exist" })
        } else {
    userDb
    .get(id)
    .then(user => {
        res.json({ user })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The post information could not be retrieved." })
    });
}
});

//Add user
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        res.status(404);
        res.json({ error: "Please enter a name" })
        } else {
    userDb
    .insert({ name })
    .then(user => {
        res.json({ user })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The user information could not be added." })
    });
    }
});

//Update user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params.id;
    const { name } = req.body;

    if(!id) {
        res.status(404);
        res.json({ error: "The user with the specified ID does not exist." })
    }
    userDb
    .update(id, name)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The user information could not be updated." })
    });
});

//Delete user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404)
        res.json({ error: "The user with the specified ID does not exist." })
        }
    userDb
    .remove(id)
    .then(response => {
        res.status(200).json(response)   
        })
    .catch(error => {
        res.status(500)
        res.json({ error: "The user could not be removed" })
        });
});

//Post endpoints

//List of posts
server.get('/api/posts', (req, res) => {
    postDb
    .get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The post information could not be retrieved." })
    });
});
// server.get('/api/posts', (req, res) => {
//     postDb
//     .get()
//     .then(posts => {
//         res.json({ posts });
//     })
//     .catch(error => {
//         res.status(500)
//         res.json({ error: "The post information could not be retrieved." })
//     });
// });


//Get post by ID
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404);
        res.json({ error: "That user ID does not exist" })
        } else {
    postDb
    .get(id)
    .then(post => {
        res.json({ post })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The post information could not be retrieved." })
    });
}
});

//Add post
server.post('/api/posts', (req, res) => {
    const { post } = req.body;
    if(!post) {
        res.status(404);
        res.json({ error: "Please enter text" })
        } else {
    postDb
    .insert({ post })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The user information could not be added." })
    });
    }
});

//Update post
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params.id;
    const { post } = req.body;

    if(!id) {
        res.status(404);
        res.json({ error: "The user with the specified ID does not exist." })
    }
    postDb
    .update(id, post)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The user information could not be updated." })
    });
});

//Delete post
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404)
        res.json({ error: "The user with the specified ID does not exist." })
        }
    postDb
    .remove(id)
    .then(response => {
        res.status(200).json(response)
                })
            .catch(error => {
                res.status(500)
                res.json({ error: "The post could not be removed" })
            });
});

//Tag endpoints

//List of tags
server.get('/api/tags', (req, res) => {
    tagDb
    .get()
    .then(tags => {
        res.json({ tags });
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The tags could not be retrieved." })
    });
});

//Get tag by ID
server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404);
        res.json({ error: "That tag ID does not exist" })
        } else {
    tagDb
    .get(id)
    .then(tag => {
        res.json({ tag })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The tag information could not be retrieved." })
    });
}
});

//Add tag
server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if(!tag) {
        res.status(404);
        res.json({ error: "Please enter a tag" })
        } else {
    userDb
    .insert({ tag })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The tag could not be added." })
    });
    }
});

//Update tag
server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params.id;
    const { tag } = req.body;

    if(!id) {
        res.status(404);
        res.json({ error: "The tag with the specified ID does not exist." })
    }
    tagDb
    .update(id, tag)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The tag could not be updated." })
    });
});

//Delete tag
server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404)
        res.json({ error: "The tag with the specified ID does not exist." })
        }
    postDb
    .remove(id)
    .then(response => {
        res.status(200).json(response)
                })
            .catch(error => {
                res.status(500)
                res.json({ error: "The post could not be removed" })
            });
});


server.listen(port, () => console.log('API running...'))