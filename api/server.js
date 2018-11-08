//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const dbPost = require('../data/helpers/postDb.js');
const dbUser = require('../data/helpers/userDb.js');

const server = express();

server.use(express.json());

// custom middleware
const pascalcase = (req, res, next) => {
    let name = req.body.name;
    name = name.split('');
    name[0] = name[0].toUpperCase();
    name = name.join('')
    req.body.name = name;
    next();
}

//posts
server.get('/api/posts', async (req, res) => {
    try {
        const posts = await dbPost.get()
        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved."})
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const id = await req.params.id;
        const post = await dbPost.get(id);
        res.json({ post })
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved." })
    }
})

server.post('/api/posts', async (req, res) => {
    const posting = req.body;
    try {
        const newpost = await dbPost.insert(posting);
        const post = await dbPost.get(newpost.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "We were unable to add your post."})
    }
})

server.delete('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const postId = await dbPost.remove(id);
        if (postId === 0) {
            res.status(404).json({ error: `There is not a post with the id of ${id}`});
        } else {
            res.status(200).json({ message: 'The post has been deleted.'});
        }
    } catch (error) {
        res.status(500).json({ error: "something is a miss."})
    }
})

server.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    const changes = await req.body;
    const count = await dbPost.update(id, changes);
    if(!changes.userId || !changes.text) {
        res.status(404).json({ error: "Please be sure to include a userId and text input."})
    } else {
        try {
            if(count === 0) {
                res.status(404).json({ error: `There is no post with the id of ${id}` })
            } else {
                const updated = await dbPost.get(id);
                res.status(200).json({ updated })
            }
            console.log(count)
        } catch (error) {
            res.status(500).json({ error: "We were unablet to update your post."})
        }
    }
})


//users
server.get('/api/users', async (req, res) => {
    try {
        const users = await dbUser.get();
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: "The users could not be retrieved."})
    }
})

server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await dbUser.get(id);
        if(!user) {
            res.status(404).json({ error: `There is no user with the id of ${id}` })
        } else {
            res.status(200).json({ user })
        }
    } catch (error) {
        res.status(500).json({ error: "The information could not be retrieved."})
    }
});

server.post('/api/users', pascalcase, async (req, res) => {
    const name = req.body;
    try {
        const new_user_id = await dbUser.insert(name);
        const user = await dbUser.get(new_user_id.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Unable to add name."})
    }
});

server.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await dbUser.get(id);
        const userId = await dbUser.remove(id);
        if (userId === 0) {
            res.status(404).json({ error: `There is not user with the id of ${id}`})
        } else {
            res.status(200).json({ message: `${user.name} has been deleted.`});
        }
    } catch (error) {
        res.status(500).json({ error: "things didnt go well"})
    }
})

server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const changes = await req.body;
    const count = await dbUser.update(id, changes);
    if (!changes.name) {
        res.status(404).json({ error: "Please be sure to include a name input." })
    } else {
        try {
            if (count === 0) {
                res.status(404).json({ error: `There is no name with the id of ${id}` })
            } else {
                const updated = await dbUser.get(id);
                res.status(200).json({ updated })
            }
        } catch (error) {
            res.status(500).json({ error: "We were unablet to update your name." })
        }
    }
})



// server.post('/api/users', async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: ''})
//     }
// })


module.exports = server;