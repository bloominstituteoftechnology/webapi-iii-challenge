const express = require('express');
const db = require('./data/dbConfig');
const server = express();
const PORT = 4000;
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const cors = require('cors')
const parser = express.json();
const logger = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
//const customMW = require('./customMiddleware');
const schema = Joi.string().lowercase();

server.use(cors())
server.use(logger('tiny'));
server.use(helmet());
server.use(parser);
//server.use(customMW.userUppercase)
/* server.use((req, res, next) => {
    const name = req.query.name;
    if (name) {
        next();
    } else {
        res.status(400).json({
            message: "Your password is incorrect"
        })
    }
 });
  */

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/********* Get Users *************/
server.get('/api/users', (req, res) => {
    users.get()
        .then((userDb) => {
            res.json(userDb);
        })
        .catch(err => {
            return sendUserError(500, 'Database Error', res);
        });
});

/********* Get Single User *************/
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            return sendUserError(500, 'The user information could not be found', res);
        });
});


/************* Create User *************/
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    users
        .insert({ name })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            return sendUserError(500, 'Failed to insert user in db', res);
        });
});


/************* Get Single User's Posts *************/
server.get('/api/users/posts/:id', (req, res) => {
    const { id } = req.params;
    users
        .getUserPosts(id)
        .then(usersPosts => {
            if (usersPosts === 0) {
                return sendUserError(404, 'No posts by that user', res);
            }
            res.json(usersPosts);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});

/************* Delete Single User *************/
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(userRemoved => {
            if (userRemoved === 0) {
                return sendUserError(404, 'The user could not be found');
            } else {
                res.json({ success: 'User Removed' });
            }
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable...', res);
        });
});

/************* Update Single User *************/
server.put('/api/users/:id',/*  customMW, */(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then(response => {
            if (response === 0) {
                return sendUserError(404, 'No user by that id');
            } else {
                db.find(id).then(user => {
                    res.json(user);
                });
            }
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

//******************* Get Posts ***************************
server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(allPosts => {
            res.json(allPosts);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});


//******************* Get Single Users Posts ***************************
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if (post === 0) {
                return sendUserError(404, 'No post by that user in the db', res);
            }
            res.json(post);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

/********************* Create new post ******************/
server.post('/api/posts', (req, res) => {
    const { id, text } = req.body;
    posts
        .insert({ id, text })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

/***************** Get all tags from single user *******/
server.get('/api/posts/tags/:id', (req, res) => {
    const { id } = req.params;
    posts
        .getPostTags(id)
        .then(postTags => {
            if (postTags === 0) {
                return sendUserError(404, 'Post not found', res);
            }
            res.json(postTags);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

// *****************  Get Tags  *************************

server.get('/api/tags', (req, res) => {
    users
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(err => {
            return sendUserError(500, 'Database boof', res);
        });
});





server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});



