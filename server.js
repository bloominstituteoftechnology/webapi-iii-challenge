const express = require('express');
const cors = require('cors');

//const db = require('./data/db.js) --> if there's only one db.js in data folder
//but it's becoz the data are kepts in helper folder so we have to get the data as below.
const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5000;
const server = express();

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

const errorAlert = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}


//----------- all end point starts here -----------//

server.get('/', (reg, res) => {
    res.send('Hello from Server Port 5000 (^_^)');
})


//----------- users end point -----------//

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            return errorAlert(500, 'The user information could not be retrieved.', res);
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(users => {
            // console.log('user id:', users.id);
            if(users === undefined) {
                return errorAlert(404, 'The user name with the specified ID does not exist.', res);
            }
            res.json({ users });
        })
        .catch(error => {
            console.log('errer:', error)
            return errorAlert(500, 'The user information could not be retrieved.', res);
        })
})

server.get('/api/users/posts/:userId', (req, res) => {
    const { userId } = req.params;
    users
        .getUserPosts(userId)
        .then(userIdPosts => {
            res.json({ userIdPosts });
        })
        .catch(error => {
            return errorAlert(500, 'The posts could not be retrieved.', res);
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return errorAlert(400, 'Please provide user name', res);
    }
    users
        .insert({ name })
        .then(newUser => {
            res.status(201).json({ newUser })
        })
        .catch(error => {
           return  errorAlert(500, 'There was an error while saving the user name to the database.', res);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(deletedUser => {
            if(deletedUser === 0) {
                return errorAlert(404, 'The user name with the specified ID does not exist.', res);
            }
            res.json({ deletedUser })
        })
        .catch(error => {
            return errorAlert(500, 'The post could not be removed.', res);
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!name) {
        return errorAlert(400, 'Please provide user name', res);
    }
    users
        .update(id, { name })
        .then(updatedUser => {
            if(updatedUser === 0) {
                return errorAlert(404, 'The user name with the specified ID does not exist.', res);
            }
            users
                .findById(id)
                .then(users => {
                    if(users === 0) {
                        return errorAlert(404, 'The user name with the specified ID does not exist.', res);
                    }
                res.json({ users })
                })
                .catch(error => {
                    return errorAlert(500, 'The user information could not be retrieved.', res);
                })
        })
        .catch(error => {
            return errorAlert(500, 'The user name could not be modified.', res);
        })
})


//----------- posts end point -----------//

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            errorAlert(500, 'The post could not be retrieved.', res);
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(posts => {
        // console.log('id: ', posts.id)
            // if(posts === undefined) {
            //     return errorAlert(404, 'The post with the specified ID does not exist.', res);
            // }
            res.json({ posts })
        })
        .catch(error => {
            return errorAlert(500, 'The post you are looking for could not be retrieved.', res);
        })
})

server.get('/api/posts/tags/:id', (req, res) => {
    const { id } = req.params;
    posts
        .getPostTags(id)
        .then(postTags => {
            res.json({ postTags })
        })
        .catch(error => {
            return errorAlert(500, 'The list of tags you are looking for could not be retrieved.', res);
        })
})

server.post('/api/posts/:userId', (req, res) => {
    const { userId } = req.params;
    const { text } = req.body;
    posts
        .insert({ userId, text })
        .then(newPost => {
            res.status(201).json({ newPost })
        })
        .catch(error => {
            errorAlert(500, 'There was an error while saving the post to the database.', res);
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(deletedPost => {
            if(deletedPost === 0) {
                return errorAlert(404, 'The post with the specified ID does not exist.', res);
            }
            res.json({ deletedPost })
        })
        .catch(error => {
            errorAlert(500, 'The post could not be removed.', res);
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    posts
        .update(id, { text })
        .then( updatedPost => {
            res.json({ updatedPost });
            
        })
        .catch(error => {
            errorAlert(500, 'The post could not be modified.', res);
        })
})


//----------- tags end point -----------//

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            errorAlert(500, 'The tag could not be retrieved.', res);
        })
})

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .get(id)
        .then(tags => {
            if(tags === undefined) {
                errorAlert(404, 'The tag with the specified ID does not exist.', res);
                return;
            }
            res.json({ tags })
        })
        .catch(error => {
            errorAlert(500, 'The tag could not be retrieved.', res);
        })
})

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    tags
        .insert({ tag })
        .then(newTag => {
            res.status(201).json({ newTag })
        })
        .catch(error => {
            errorAlert(500, 'There was an error while saving the tag to the database.', res);
        })
})

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .remove(id)
        .then(deletedTag => {
            if(deletedTag === 0) {
                return errorAlert(404, 'The tag with the specified ID does not exist.', res);
            }
            res.json({ deletedTag })
        })
        .catch(error => {
            errorAlert(500, 'The tag could not be removed.', res);
        })
})

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    tags
        .update(id, { tag })
        .then( updatedTag => {
            res.json({ updatedTag });
        })
        .catch(error => {
            errorAlert(500, 'The tag could not be modified.', res);
        })
})


server.listen(port, () => console.log(`Server is running on port ${port}`));