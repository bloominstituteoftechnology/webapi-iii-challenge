// node modules
const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');
const cors = require('cors');
const helmet = require('helmet');

// init server
const server = express();
const port = 8000;

const errors = {
    400: 'Please provide information with your request.',
    403: 'Balance is the key, making things even is the secret to success.',
    404: 'The specified ID does not exist.',
    500: 'The information could not be accessed.'
}

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        res.status(403).json({error: errors["403"]});
    }
}

//opt in
server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).send('Server running...');
});

// POSTS CRUD operations
server.get('/api/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);
        
        if(posts.length > 0) {
            const post = await postDb.get(id);
            
            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.get('/api/posts/:id/postTags', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.getPostTags(id);

        if(post[0]) {
            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.post('/api/posts', isEven, async (req, res) => {
    try {
        const post = {...req.body};

        if(!post.userId || !post.text) {
            res.status(400).json({error: errors["400"]});
        } else {
            const newPost = await postDb.insert(post);
            res.status(201).json(post);
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.put('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = req.body;
        let posts = await postDb.get();

        posts = posts.filter(post => post.id == id ? post : null);
        
        if(posts.length > 0 && (post.userId && post.text)) {
            const updatePost = await postDb.update(id, post);
            findPost = await postDb.get(id);
            
            res.status(200).json(findPost);
        } else if (!posts.length > 0) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.delete('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.get(id);

        if(post) {
            const delPost = await postDb.remove(id);

            res.status(200).json(post);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// TAGS CRUD operations
server.get('/api/tags', async (req, res) => {
    try {
        const tags = await tagDb.get();

        res.status(200).json(tags);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.get('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.post('/api/tags', isEven, async (req, res) => {
    try {
        const tag = {...req.body};

        if(tag.tag) {
            const newTag = await tagDb.insert(tag);

            res.status(201).json(tag);
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.put('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = req.body;
        let findTag = await tagDb.get(id);

        if(findTag && (tag.tag)) {
            const updateTag = await tagDb.update(id, tag);
            findTag = await tagDb.get(id);

            res.status(200).json(findTag);
        } else if (!findTag) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.delete('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            const delTag = await tagDb.remove(id);

            res.status(200).json(tag);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// USERS CRUD operations
server.get('/api/users', async (req, res) => {
    try {
        const users = await userDb.get();

        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.get('/api/users/:id/userPosts', async (req, res) => {
    try {
        const {id} = req.params;
        const userPosts = await userDb.getUserPosts(id);

        if(userPosts.length > 0) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.post('/api/users', isEven, async (req, res) => {
    try {
        const user = {...req.body};

        if(user.name) {
            const newUser = await userDb.insert(user);

            res.status(201).json(user);
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.put('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.body;
        let findUser = await userDb.get(id);

        if(findUser && (user.name)) {
            const updateUser = await userDb.update(id, user);
            findUser = await userDb.get(id);

            res.status(200).json(findUser);
        } else if (!findUser) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

server.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            const delUser = await userDb.remove(id);

            res.status(200).json(user);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// catch invalid routes
server.use(function (req, res) {
    res.status(404).json({error: "Ain't nobody got time for that!"});
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
