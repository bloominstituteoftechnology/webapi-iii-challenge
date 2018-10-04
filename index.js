const express = require('express');
const cors = require('cors');
const usersDb = require('./data/helpers/userDb');
const postsDb = require('./data/helpers/postDb');

// ~~~~~ SERVER INITIALIZATION ~~~~~ //
const server = express();
server.use(cors());
server.use(express.json());


// ~~~~~ MIDDLEWARE ~~~~~ //
const userToUpperCase = (req, res, next) => {
    if(req.body.name) req.body.name = req.body.name.toUpperCase();
    next();
};
server.use(userToUpperCase);


// ~~~~~ ROUTES ~~~~~ //
// ~~ testing, testing. 1, 2. ~~ //
server.get('/', (req, res) => {
    res.status(200).json({"message": "I AM ROOT!"});
});

server.get('/api', (req, res) => {
    res.status(404).json({"error": "Naughty, naughty. Alas, there's nothing here. Quoth the pigeon, 404!"});
});

// ~~ Users ~~ //
// {
//      id: number,
//      name: string  // required. < 129 char
// }

// ~~ Posts ~~ //
// {
//     id: number,
//     userId: number,  // required. ID of existing user
//     text: string  // required.
// }

const usersDbAccessError = {"error": "There was an error accessing the users database."};
const postsDbAccessError = {"error": "There was an error accessing the posts database."};

// ~~ GET ~~ //
// user: get() -> [{obj1},...,{objN}]
server.get('/api/users', (req, res) => {
    usersDb.get()
        .then((usersList) => {
            res.status(200).json(usersList);
        })
        .catch((err) => {
            console.error('userDb.js/get() Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// post: get() -> [{obj1},...,{objN}]
server.get('/api/posts', (req, res) => {
    postsDb.get()
        .then((postsList) => {
            res.status(200).json(postsList);
        })
        .catch((err) => {
            console.error('postDb.js/get() Access Error:\n', err);
            res.status(500).json(postsDbAccessError);
        });
});

// user: get(id) -> {obj}
server.get('/api/users/:id', (req, res) => {
    usersDb.get(req.params.id)
        .then((user) => {
            if(user !== undefined) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"error": `A user with ID ${req.params.id} doesn't exist.`});
            }
        })
        .catch((err) => {
            console.error('userDb.js/get(id) Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// post: get(id) -> {obj}
server.get('/api/posts/:id', (req, res) => {
    postsDb.get(req.params.id)
        .then((post) => {
            if(post !== undefined) {
                res.status(200).json(post);
            } else {
                res.status(404).json({"error": `A post with ID ${req.params.id} doesn't exist.`});
            }
        })
        .catch((err) => {
            console.error('postDb.js/get(id) Access Error:\n', err);
            res.status(500).json(postsDbAccessError);
        });
});

// user: getUserPosts(id) -> [{obj1},...,{objN}]
server.get('/api/userposts/:id', (req, res) => {
    usersDb.getUserPosts(req.params.id)
        .then((userPosts) => {
            if(userPosts.length > 0) {
                res.status(200).json(userPosts);
            } else {
                res.status(404).json({"error": `A user with ID ${req.params.id} doesn't exist.`});
            }            
        })
        .catch((err) => {
            console.error('userDb.js/getUserPosts(id) Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// ~~ POST ~~ /
// user: insert({obj}) -> {id: ##}
server.post('/api/users', (req, res) => {
    if(req.body.name) {
        const newUserObj = {"name": req.body.name};
        usersDb.insert(newUserObj)
            .then((newId) => {
                usersDb.get(newId.id)
                    .then((newUser) => {
                        res.status(200).json(newUser);
                    })
                    .catch((err) => {
                        console.error('userDb.js/get(id) Access Error:\n', err);
                        res.status(500).json(usersDbAccessError);
                    });
            })
            .catch((err) => {
                console.error(`userDb.js/insert({"name": "value"}) Access Error:\n`, err);
                res.status(500).json(usersDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide a name value in your POST"});
    }
});

// post: insert({obj}) -> {id: ##}
server.post('/api/posts', (req, res) => {
    if(req.body.userId && req.body.text) {
        usersDb.get(req.body.userId)
            .then((user) => {
                if(user !== undefined) {
                    const newPostObj = {"userId": req.body.userId, "text": req.body.text};
                    postsDb.insert(newPostObj)
                        .then((newId) => {
                            postsDb.get(newId.id)
                                .then((newPost) => {
                                    res.status(200).json(newPost);
                                })
                                .catch((err) => {
                                    console.error('postDb.js/get(id) Access Error:\n', err);
                                    res.status(500).json(postsDbAccessError);
                                });
                        })
                        .catch((err) => {
                            console.error(`postDb.js/insert({"userId": "value", "text": "value"}) Access Error:\n`, err);
                            res.status(500).json(postsDbAccessError);
                        });
                } else {
                    res.status(404).json({"error": `A user with ID ${req.body.userId} doesn't exist.`});
                }
            })
            .catch((err) => {
                console.error(`userDb.js/insert({"name": "value"}) Access Error:\n`, err);
                res.status(500).json(usersDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide userId and text values in your POST"});
    }
});

// ~~ PUT ~~ //
// user: update(id, {}) -> count of updated records
server.put('/api/users/:id', (req, res) => {

});

// post: update(id, {}) -> count of updated records
server.put('/api/posts/:id', (req, res) => {

});

// ~~ DELETE ~~ //
// user: remove(id) -> # of records deleted
server.delete('/api/users/:id', (req, res) => {

});

// post: remove(id) -> # of records deleted
server.delete('/api/posts/:id', (req, res) => {

});


// ~~~~~ LISTENER ~~~~~ //
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
