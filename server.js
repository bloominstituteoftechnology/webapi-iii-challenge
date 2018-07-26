const express = require('express');
const server = express();
const cors = require('cors');

const postDb = require('./data/helpers/postDb.js')
const tagsDb = require('./data/helpers/tagDb.js')
const userDb = require('./data/helpers/userDb.js')



server.use(express.json());
server.use(cors());


const upperTags = function(req, res, next) {
    let tag = req.query.tag;
    return tag.toUpperCase();
    next();
}


const sendServerError = (msg, res) => {
    res.status(500);
    res.json(msg);
    return;
}

//***************************** Posts endpoints *****************************

//Retrieves all posts
server.get('/api/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts)
    } catch(err) {
        sendServerError({error: 'The posts information could not be retrieved.'})
    };
});

//Retrieves single post
server.get('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
    const post = await postDb.get(id);
        res.status(200).json(post);
    if(!id) {
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    }

    } catch(err) {
        sendServerError({error: 'The post information could not be retrieved.'})
    };
})

//Creates new post
server.post('/api/posts', async (req, res) => {
    const post = req.body;

    try{
        const newPost = await postDb.insert(post);
        res.status(201).json(newPost)
    if(!post) {
        res.status(400).json({error: 'Please provide content for your post.'})
    }
    } catch(err) {
        sendServerError({error: 'There was an error saving the post to the database.'})
    }
})

//Updates post
server.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = req.body;

    try {
        const updatedPost = await postDb.update(id, post);
        res.status(200).json(updatedPost);
    
        if(!id) {
            res.status(404).json({error: 'The post with the specified ID does not exist.'})
        }
        if(!post) {
            res.status(400).json({error: 'Please provide text for your post.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error saving the changes.'})
    }
})

//Deletes post
server.delete('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await postDb.remove(id) ;
        res.status(200).json({deleted})

        if(!id) {
            res.status(404);
            res.json({error: 'The post with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error deleting the post.'})
    }
})

//Retrieves list of tags on single post

server.get('/api/posts/:id/tags', async (req, res) => {
    const id = req.params.id;

    try {
        const tagsList = await postDb.getPostTags(id);
        res.status(200).json({tagsList})

        if(!id) {
            res.status(404);
            res.json({error: 'The post with the specified ID does not exist.'})
        }

    } catch(err) {
        sendServerError({error: 'The post tags could not be retrieved.'})
    }
})

//***************************** Users endpoints *****************************

//Posts by single user
server.get('/api/users/:userId/posts', async (req, res) => {
    const userId = req.params.userId;

    try{
        const userPosts = await userDb.getUserPosts(userId);
        res.status(200).json(userPosts);

        if(!userId) {
            res.status(404);
            res.json({error: 'The user with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'The user posts could not be retrieved.'})
    }
})

//Retrieves list of users
server.get('/api/users', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users)
    } catch(err) {
        sendServerError({error: 'The users could not be retrieved.'})
    }
})


//Retrieves single user
server.get('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userDb.get(userId);
        res.status(200).json(user)

        if(!userId) {
            res.status(404);
            res.json({error: 'The user with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'The user could not be retrieved.'})
    }
})


//Creates new user
server.post('/api/users', async (req, res) => {
    const name = req.body;

    try{
        const newUser = await userDb.insert(name);
        res.status(201).json(newUser);

        if(!name) {
            res.status(400).json({error: 'Please provide a username.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error saving the user to the database.'})
    }
})

//Updates user
server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body;

    try {
        const updatedUser = await userDb.update(id, name); 
        res.status(200).json(updatedUser);

        if(!id) {
            res.status(404);
            res.json({error: 'The user with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error saving the changes.'})
    }
})

//Deletes user
server.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await userDb.remove(id) ;
        res.status(200).json({deleted})

        if(!id) {
            res.status(404);
            res.json({error: 'The user with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error deleting the user.'})
    }
})

//***************************** Tags endpoints *****************************

//Retrieves list of tags
server.get('/api/tags', async (req, res) => {
    try {
        const tags = await tagsDb.get();
        server.use(upperTags);
        console.log(tags);
        res.status(200).json(tags)
    } catch(err) {
        sendServerError({error: 'The tags could not be retrieved.'})
    }
})


//Retrieves single tag
server.get('/api/tags/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const tag = await tagsDb.get(id);
        res.status(200).json(tag)

        if(!id) {
            res.status(404);
            res.json({error: 'The tag with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'The tag could not be retrieved.'})
    }
})

//Creates new tag
server.post('/api/tags', async (req, res) => {
    const tag = req.body;

    try {
        const newTag = await tagsDb.insert(tag);
        res.status(201).json(newTag)

        if(!tag) {
            res.status(400).json({error: 'Please provide a tag.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error saving the tag to the database.'})
    }
})

//Updates tag
server.put('/api/tags/:id', async (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    try {
        const updatedTag = await tagsDb.update(id, tag);
        res.status(200).json(updatedTag)

        if(!id) {
            res.status(404);
            res.json({error: 'The tag with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error saving the changes.'})
    }
})

//Deletes tag
server.delete('/api/tags/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await  tagsDb.remove(id) ;
        res.status(200).json({deleted})
        
        if(!id) {
            res.status(404);
            res.json({error: 'The tag with the specified ID does not exist.'})
        }
    } catch(err) {
        sendServerError({error: 'There was an error deleting the tag.'})
    }
})

server.listen(8000, () => console.log('API running'))