//express
//cors
const express = require('express');
const cors = require('cors'); 
const postsDb = require('./data/helpers/postDb.js')
const usersDb = require('./data/helpers/userDb.js')
const tagsDb = require('./data/helpers/tagDb.js')

const port = 5555;
const server = express(); 
server.use(express.json()); 
server.use(cors({ origin: 'http://localhost:3000'})); 

//database helpers & MiddleWare

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return; 
}; 

// const customLogger = (req, res, next) => {
//     const ua = req.headers['user-agent'];
//     const { path } = req;
//     const timeStamp = Date.now();
//     const log = { path, ua, timeStamp };
//     const stringLog = JSON.stringify(log); 
//     console.log(stringLog);
//     next();        
// }; 

// server.use(customLogger); 

const searchMiddleWare = (req, res, next) => {
    if (!req.query.name) {
        next (); 
    }
    usersDb
        .get()
        .then(users => {
            const { name } = req.query; 
            const filteredUsers = users.filter(
                user => user.name.toLowercase() === name.toLowercase() 
             ); 
             req.users = filteredUsers;
             next();
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There's an error!" }); 
        });
}; 

//CRUD for Users

server.get('/',searchMiddleWare, (req, res) => {
    console.log(req.query); 
    console.log(req.users); 
    const { users } = req;
    if (!users) {
        res.json('Welcome to Middle Earth!')
    }
    if (users.length === 0) {
        sendUserError(404, `No ${req.query.name} in Middle-Earth`, res);
        return;
    } else {
        res.json({ users }); 
    }
});


server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users }); 
        })
        .catch(error => {
            sendUserError(500, 'The user information could not be retrieved.', res);
            return;
        });
}); 

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params; 
    usersDb
        .getUserPosts(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(400, "User with that id not found.", res); 
                return; 
            }
            res.json(user); 
        })
        .catch(error => {
            sendUserError(500, "Error looking up user", res);
            return; 
        }); 
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        sendUserError(400, 'Must provide a name.', res);
        return;
    }
    usersDb   
        .insert({ name })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            console.log(error); 
        });     
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb   
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, "The user with that ID does not exist.", res);
                return; 
            } 
            res.json({ success: `User with id: ${id} removed from system.`}); 
        })
        .catch(error => {
            console.log(error);
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body; 
    if (!name) {
        sendUserError(400, "Must provide name", res);
        return;
    }
    usersDb   
        .update(id, {name })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            sendUserError(500, "An error happened in the database.", res)
            return; 
        })
}); 

//CRUD for Posts

// server.get('/api/posts')

server.get('/api/posts', (req, res) => {
    postsDb
        .get()
        .then(posts => {
            res.json({ posts }); 
        })
        .catch(error => {
            sendUserError(500, 'The post could not be retrieved.', res);
            return;
        });
}); 

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; 
    postsDb
        .getPostTags(id)
        .then(post => {
            if (post.length === 0) {
                sendUserError(400, "Post with that id not found.", res); 
                return; 
            }
            res.json(post); 
        })
        .catch(error => {
            sendUserError(500, "Error looking up post", res);
            return; 
        }); 
});

server.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    if(!userId || !text) {
        sendUserError(400, 'Must provide userId and text.', res);
        return;
    }
    postsDb   
        .insert({ userId, text })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            console.log(error); 
        });     
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postsDb   
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, "The post with that ID does not exist.", res);
                return; 
            } 
            res.json({ success: `Post with id: ${id} removed from system.`}); 
        })
        .catch(error => {
            console.log(error);
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body; 
    if (!userId || !text) {
        sendUserError(400, "Must provide user id and text.", res);
        return;
    }
    postsDb   
        .update(id, { userId, text })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            sendUserError(500, "An error happened in the database.", res)
            return; 
        })
}); 

//CRUD for Tags

// server.get('api/tags')

server.get('/api/tags', (req, res) => {
    tagsDb
        .get()
        .then(tags => {
            res.json({ tags }); 
        })
        .catch(error => {
            sendUserError(500, 'The tag could not be retrieved.', res);
            return;
        });
}); 

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params; 
    postsDb
        .getPostTags(id)
        .then(tag => {
            if (tag.length === 0) {
                sendUserError(400, "Tag with that id not found.", res); 
                return; 
            }
            res.json(tag); 
        })
        .catch(error => {
            sendUserError(500, "Error looking up tag", res);
            return; 
        }); 
});

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if(!tag) {
        sendUserError(400, 'Must provide tag.', res);
        return;
    }
    tagsDb   
        .insert({ tag })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            console.log(error); 
        });     
});

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    postsDb   
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, "The tag with that ID does not exist.", res);
                return; 
            } 
            res.json({ success: `Tag with id: ${id} removed from system.`}); 
        })
        .catch(error => {
            console.log(error);
        });
});

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body; 
    if (!tag) {
        sendUserError(400, "Must provide user tag.", res);
        return;
    }
    postsDb   
        .update(id, { tag })
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(error => {
            sendUserError(500, "An error happened in the database.", res)
            return; 
        })
}); 

server.listen(port, () => console.log(`Server running on port ${port}`));


