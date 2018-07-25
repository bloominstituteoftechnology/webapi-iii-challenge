const express = require('express');
const server = express();
const cors = require('cors');

const postDb = require('./data/helpers/postDb.js')
const tagsDb = require('./data/helpers/tagDb.js')
const userDb = require('./data/helpers/userDb.js')



server.use(express.json());
server.use(cors());


const sendServerError = (msg, res) => {
    res.status(500);
    res.json(msg);
    return;
}

//***************************** Posts endpoints *****************************

//Retrieves all posts
server.get('/api/posts', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The posts information could not be retrieved.'})
    });
});

//Retrieves single post
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }
    postDb.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The post information could not be retrieved.'})
    })
})

//Creates new post
server.post('/api/posts', (req, res) => {
    const post = req.body;

    if(!post) {
        res.status(400).json({error: 'Please provide content for your post.'})
    }

    postDb.insert(post)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the post to the database.'})
    })
})

//Updates post
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;

    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }

    postDb.update(id, post) 
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the changes.'})
    })
})

//Deletes post
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }

    postDb.remove(id) 
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        sendServerError({error: 'There was an error deleting the post.'})
    })
})

//Retrieves list of tags on single post

server.get('/api/posts/:id/tags', (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }

    postDb.getPostTags(id)
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        sendServerError({error: 'The post tags could not be retrieved.'})
    })

})

//***************************** Users endpoints *****************************

//Posts by single user
server.get('/api/posts/user/:userId', (req, res) => {
    const userId = req.params.userId;

    if(!userId) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist.'})
    }

    userDb.getUserPosts(userId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The user posts could not be retrieved.'})
    })
})

//Retrieves list of users
server.get('/api/users', (req, res) => {
    userDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The users could not be retrieved.'})
    })
})


//Retrieves single user
server.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;

    if(!userId) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist.'})
    }

    userDb.get(userId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The user could not be retrieved.'})
    })
})

//Creates new user
server.post('/api/users', (req, res) => {
    const name = req.body;

    if(!name) {
        res.status(400).json({error: 'Please provide a username.'})
    }

    userDb.insert(name)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the user to the database.'})
    })
})

//Updates user
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body;

    if(!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist.'})
    }

    userDb.update(id, name) 
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the changes.'})
    })
})

//Deletes user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist.'})
    }

    userDb.remove(id) 
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        sendServerError({error: 'There was an error deleting the user.'})
    })
})

//***************************** Tags endpoints *****************************

//Retrieves list of tags
server.get('/api/tags', (req, res) => {
    tagsDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The tags could not be retrieved.'})
    })
})


//Retrieves single tag
server.get('/api/tags/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The tag with the specified ID does not exist.'})
    }

    tagsDb.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The tag could not be retrieved.'})
    })
})

//Creates new tage
server.post('/api/tags', (req, res) => {
    const tag = req.body;

    if(!tag) {
        res.status(400).json({error: 'Please provide a tag.'})
    }

    tagsDb.insert(tag)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the tag to the database.'})
    })
})

//Updates tag
server.put('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    if(!id) {
        res.status(404);
        res.json({error: 'The tag with the specified ID does not exist.'})
    }

    tagsDb.update(id, tag) 
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving the changes.'})
    })
})

//Deletes tag
server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The tag with the specified ID does not exist.'})
    }

    tagsDb.remove(id) 
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        sendServerError({error: 'There was an error deleting the tag.'})
    })
})

server.listen(8000, () => console.log('API running'))