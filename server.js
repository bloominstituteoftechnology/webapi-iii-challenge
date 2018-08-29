const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

const port = 9000;
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(express('short'));
server.use(morgan());

//MIDDLEWARE
function upperCase(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

//GET METHOD
server.get('/users', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

//POST METHOD
server.post('/users', async (req, res) => {
    const user = req.body;
    if (user.title && user.contents) {
        try {
            const response = await db.insert(post);
            res.status(201).json(response);
        } catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the post to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});

server.listen(port, () => console.log(`API on port ${port}`))