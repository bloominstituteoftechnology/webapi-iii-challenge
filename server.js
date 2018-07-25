const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json());

server.get('/users', (req, res) => {
    userDb.get().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "Nobody is here."})
)
})

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be got"})
    });
})

server.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name)
    res.status(400).json({ errorMessage: "Give a name fool"});
    userDb.insert({ name })
    .then(posts => res.status(201).json({ name}))
    .catch(err => res.status(400).json({ error: "Error Saving User"}))
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(req.params.id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({message: "Gone forever"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleteing User"})
    });
})

server.put('/users/:id', (req, res) => {
    const { name } = req.body;
    if(!name)
    res.status(400).json({ errorMessage: "Provide name please"});
    userDb.update(req.params.id, {name})
    .then(users => {
        if(users.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({name});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

server.get('/users/:id/posts', (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({message:"ID doesnt exist"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: "User post cant be retrieved"})
    });
})




//////////////////////////users

server.get('/post', (req, res) => {
    postDb.get().then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "No post here"})
)
})

server.get('/post/:id', (req, res) => {
    postDb.get(req.params.id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be got"})
    });
})

server.post('/post', (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text)
    res.status(400).json({ errorMessage: "Give some text fool"});
    postDb.insert({ userId, text })
    .then(posts => res.status(201).json({userId, text}))
    .catch(err => res.status(400).json({ error: "Error Saving post"}))
})

server.delete('/post/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(req.params.id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({message: "That ID dont exist"});
        }
        res.status(200).json({message: "Gone forever no turning back now"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleting Post"})
    });
})

server.put('/post/:id', (req, res) => {
    const { text } = req.body;
    if(!text)
    res.status(400).json({ errorMessage: "Provide text please"});
    postDb.update(req.params.id, {text})
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({text});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

server.get('/post/:id/tags', (req, res) => {
    postDb.getPostTags(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({message:"ID doesnt exist"});
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({error: "Post tag cant be retrieved"})
    });
})

/////////////////////////posts

server.get('/tag', (req, res) => {
    tagDb.get().then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json({ error: "Tag, you are it"})
)
})

server.get('/tag/:id', (req, res) => {
    tagDb.get(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({ error: "Tag info could not be got"})
    });
})

server.post('/tag', (req, res) => {
    const { tag } = req.body;
    if (!tag)
    res.status(400).json({ errorMessage: "Give me a tag fool"});
    tagDb.insert({ tag })
    .then(posts => res.status(201).json({tag}))
    .catch(err => res.status(400).json({ error: "Error Saving tag"}))
})

server.delete('/tag/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({message: "That ID dont exist"});
        }
        res.status(200).json({message: "Gone forever no turning back now"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleting tag"})
    });
})

server.put('/tag/:id', (req, res) => {
    const { tag } = req.body;
    if(!tag)
    res.status(400).json({ errorMessage: "Provide tag please"});
    tagDb.update(req.params.id, {tag})
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({tag});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})





//////////////////////////tags













server.listen(9000, () => console.log("Api running here"));