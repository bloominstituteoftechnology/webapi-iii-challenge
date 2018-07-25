const express = require("express");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");


const server = express();
server.use(express.json());


// USERS
// all users
server.get('/users', (req, res) => {
    userDb
    .get()
    .then(users => {
        res
        .status(200)
        .json(users);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});


// user by id
server.get('/users/:id', (req, res) => {
    userDb
    .get(req.params.id)
    .then(user => {
        if (user.length === 0) {
            res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(user);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});


//Insert User
server.post('/users', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({errorMessage: "Please provide name for the user."})
        return;
    }
    userDb
        .insert({
            name
        })
        .then(response => {
            res.status(201).json({name});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the user to the database" })
        })
});


//Update User
server.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!name) {
        res.status(404).json({errorMessage: "Please provide name for the user."})
    }
    userDb
    .update(id, {name})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
            return;
        }
        res.status(200).json({name})
    })
    .catch(error => {
        res.status(500).json({error: "The user information could not be modified."})
        return;
    });
});


//Delete User
server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The user with the specified ID does not exist."})
        }
        res
        .json({message:'User removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The user could not be removed"})
        })
});


//Get user Posts
server.get('/users/:id/posts', (req, res) => {
    userDb
    .getUserPosts(req.params.id)
    .then(posts => {
        if (!posts) {
            res
            .status(404)
            .json({ message: "There are no posts" });
        }
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user post information could not be retrieved."});
});
});




// POSTS
// All posts
server.get('/posts', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The posts information could not be retrieved."});
});
});


//post by ID
server.get('/posts/:id', (req, res) => {
    postDb
    .get(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(post);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved."});
});
});

//get post tags

server.get('/posts/:id/tags', (req, res) => {
    postDb
    .getPostTags(req.params.id)
    .then(tags => {
        if (tags.length ===0) {
            res.json({message: "id doesnt exist"})
        }
        res 
        .status(200)
        .json({tags})
    })
    .catch(error => {
        res.status(500).json({error: "post tag cannot be retrieved"})
    })
})


// Insert post 
server.post('/posts', (req, res) => {
    const {text, userId} = req.body;
    if (!text || !userId) {
        res.status(400).json({errorMessage: "Please provide text and userId for the post."})
        return;
    }
    postDb
        .insert({
            text, userId
        })
        .then(response => {
            res.status(201).json({text, userId});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the post to the database" })
        })
});

//Update post
server.put('/posts/:id', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    if (!text) {
        res.status(400).json({errorMessage: "Please provide text and userId for the post."})
        return;
    }
    postDb
    .update(id, {text})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
            return;
        }
        res.status(200).json({text})
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be modified."})
        return;
    });
});


//Delete Post
server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    postDb
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
        res
        .json({message:'Post removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The post could not be removed"})
        })
});







// TAGS
// All tags
server.get('/tags', (req, res) => {
    tagDb
    .get()
    .then(tags => {
        res
        .status(200)
        .json(tags);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tags information could not be retrieved."});
});
});


// tag by id
server.get('/tags/:id', (req, res) => {
    tagDb
    .get(req.params.id)
    .then(tag => {
        if (tag.length === 0) {
            res
            .status(404)
            .json({ message: "The tag with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(tag);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tag information could not be retrieved."});
});
});


//Insert tag
server.post('/tags', (req, res) => {
    const {tag} = req.body;
    if (!tag) {
        res.status(400).json({errorMessage: "Please provide tag for the post."})
        return;
    }
    tagDb
        .insert({
            tag
        })
        .then(response => {
            res.status(201).json({tag});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the tag to the database" })
        })
});

//Update tag
server.put('/tags/:id', (req, res) => {
    const {id} = req.params;
    const {tag} = req.body;
    if (!tag) {
        res.status(400).json({errorMessage: "Please provide tag for the tag."})
        return;
    }
    tagDb
    .update(id, {tag})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The tag with the specified ID does not exist."})
            return;
        }
        res.status(200).json({tag})
    })
    .catch(error => {
        res.status(500).json({error: "The tag information could not be modified."})
        return;
    });
});

//Delete tag
server.delete('/tags/:id', (req, res) => {
    const {id} = req.params;
    tagDb
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The tag with the specified ID does not exist."})
        }
        res
        .json({message:'tag removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The tag could not be removed"})
        })
});

server.listen(8000, () => console.log("Yo, your API us running on port 8000"));