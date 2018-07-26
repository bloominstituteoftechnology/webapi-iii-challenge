// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');



const server = express();
const port = 5000;

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:5000' }));


//router handlers
server.get('/', (req, res) => {
  res.send('Hello World');
});

//User Endpoints - router handlers
server.get('/api/users', (req, res) => {
	userDb.get()
		.then(users => {
			res.status(200).json({users});
		})
		.catch(err => {
			res.status(500).json({error: "Please provide user name."});
		});
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDb.get(id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ error: `There is no user with id ${id}`});
        })
        .catch( error => {
            res.status(500).json({ error: `Error in retrieving user with this id ${id}`})
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body
    name ? (
        userDb.insert({ name })
            .then( id => {
                res.status(201)
                userDb.get(id.id)
                    .then( user => {
                        user ? res.status(200).json(user) : res.status(404).json({ Error: `There is no user with id ${id}`})
                    })
                    .catch( error => {
                        res.status(500).json({ error: `Error with retrieving user with this id ${id}`})
                    })
            })
            .catch( error => {
                res.status(500).json({ error: `Error in creating new user with this name '${name}'`})
            })
    ) : (
        res.status(400).json({ Error: "Enter name of user" })
    )
});


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDb.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                userDb.get()
                    .then( users => {
                        res.status(200).json({ users })
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Could not retrieve this user" })
                    })
            } else {
                res.status(404).json({ error: `There is no user with id ${id}`})
            }
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    name ? (
        userDb.update(id, { name })
            .then( response => {
                if (response) {
                    res.status(200)
                    userDb.get(id)
                        .then( user => {
                            user ? res.status(200).json(user) : res.status(404).json({ error: `There is no user with id ${id}`})
                        })
                        .catch( error => {
                            res.status(500).json({ error: `Error in retrieving user with id ${id}`})
                        })
                } else {
                    res.status(500).json({ error: `Unable to update user with id ${id}`})
                }
            })
    ) : (
        res.status(404).json({ error: "Enter name of user"})
    )
});

//************POST ENDPOINTS***************************//

server.get('/api/posts', (req, res) => {
    postDb.get()
        .then( posts => {
            res.status(200).json(posts)
        })
        .catch( error => {
            res.status(500).json({ error: "Error retrieving posts" })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    postDb.get(id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ error: `There are no posts with id ${id}`});
        })
        .catch( error => {
            res.status(500).json({ error: `Error in retrieving posts with this user id ${id}`})
        })
})

server.delete('/api/users/:id/posts/:postId', (req, res) => {
    const { id, postId } = req.params
    postDb.remove(postId)
        .then( response => {
            if (response) {
                res.status(200)
                userDb.getUserPosts(id)
                    .then( posts => {
                        posts.length > 0 ? res.status(200).json(posts) : res.status(404).json({ error: `This user ${id} has no posts` })
                    })
                    .catch( error => {
                        res.status(500).json({ error: `Can not retrieve posts for this user ${id}` })
                    })
            } else {
                res.status(404).json({ error: `Unable to delete posts ${postId}` })
            }
        })
})

server.put('/api/users/:id/posts/:postId', (req, res) => {
    const { id, postId } = req.params
    const { text } = req.body
    text ? (
        postDb.update(postId, { userId: id, text: text })
            .then( response => {
                if (response) {
                    postDb.get(postId)
                        .then( post => {
                            post ? res.status(200).json(post) : res.status(404).json({ error: `Unable to find post for this user ${postId}` })
                        })
                        .catch( error => {
                            res.status(500).json({ error: `Unable to locate post for this user ${postId}` })
                        })
                } else {
                    res.status(404).json({ error: `Unable to update posts for this user. ${postId}`})
                }
            })
    ) : (
        res.status(400).json({ error: "Missing text for a post" })
    )
})

//************TAG ENDPOINTS***************************//

server.get('/api/tags', (req, res) => {
    tagDb.get()
        .then( posts => {
            res.status(200).json(posts)
        })
        .catch( error => {
            res.status(500).json({ error: "Error retrieving posts" })
        })
})

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params
    tagDb.get(id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ error: `There are no tags for this user ${id}`});
        })
        .catch( error => {
            res.status(500).json({ error: `Error in retrieving tags with this user ${id}`})
        })
})

server.post('/api/tags', (req, res) => {
    const { tag } = req.body
    tag ? (
        tagDb.insert({ tag })
            .then( id => {
                res.status(201)
                tagDb.get(id.id)
                    .then( tag => {
                        tag ? res.status(200).json(tag) : res.status(404).json({ error: `Unable to locate tags for this user ${id.id}` })
                    })
                    .catch( error => {
                        res.status(500).json({ error: `Could not find tag with id ${id.id}` })
                    })
            })
            .catch( error => {
                res.status(500).json({ error: "Unable to create tag" })
            })
    ) : (
        res.status(400).json({ error: "Add a tag." })
    )
})

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params
    tagDb.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                tagDb.get()
                    .then( tags => {
                        res.status(200).json(tags)
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Error retrieving tags" })
                    })
            } else {
                res.status(404).json({ error: `Unable to delete tag for this user ${id}` })
            }
        })
        .catch( error => {
            res.status(500).json({ error: "Unable delete tag" })
        })
})

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params
    const { tag } = req.body
    tag ? (
        tagDb.update(id, { tag })
            .then( response => {
                if (response) {
                    tagDb.get(id)
                        .then( tag => {
                            tag ? res.status(200).json(tag) : res.status(404).json({ error: `Unable to locate tag for this user ${id}` })
                        })
                        .catch( error => {
                            res.status(500).json({ error: `Unable to locate tag for this user ${id}` })
                        })
                } else {
                    res.status(404).json({ error: `Unable to update this tage ${id}`})
                }
            })
    ) : (
        res.status(400).json({ error: "error" })
    )
})



// server port
server.listen(port, () => console.log(`API listening on port ${port}`));
