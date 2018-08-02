const express = require('express');
const server = express();

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());


// ==== ERROR MESSAGE ====

const serverErrorMsg = () => {
    return res.status(500).json({ error: 'server error.' });
}

// ==== MIDDDLEWARE ====

const checkIfName = (req,res,next) => {
    const { name } = req.body;
    if (name == null) {
        return res.status(400).json({ errorMessage: 'Please provie a name for the user' })
    } else {
        next();
    }
};


// ==== USER REQUESTS ====

server.get('/users', (req, res) => {
    userDb.get()
        .then(response =>
            res.status(200).json(response)
        )
        .catch(() => {
            serverErrorMsg;
        })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: 'The user with this data does not exist'})
            }
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg;
        })
});

server.post('/users', checkIfName, (req, res) => {
    const user = req.body;
    console.log(user);
    userDb.insert(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            serverErrorMsg;
        })
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(response => {
            if( response < 1) {
                res.status(404).json({ message: 'the user with the specified ID does not match any existing files' })
            }
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg;
        })
})

server.put('/users/:id', checkIfName, (req, res) => {
    const { id } = req.params;
    const user = req.body;
    userDb.update(id, user)
        .then( response => {
            if ( response < 1) {
                res.status(404).json({ message: 'The user with the spcified Id could not be found'})
            }
            res.status(200).json(user)
        })
        .catch(() => {
            serverErrorMsg;
        })
})


// ======= POST REQUESTS ========

server.get('/users/posts/:id', (req, res) => {
    const { id } = req.params;

    userDb.getUserPosts(id)
        .then( response => {
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg;
        })
})

server.post('/users/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (post.userId !== id) {
        res.status(404).json({ message: 'The user with this data does not exist' })
    } else if (post.text == null ) {
        res.status(400).json({ errorMessage: 'Please provide text for the post.'})
    }
    postDb.insert(post)
        .then( post => {
            res.status(200).json(post)
        })
        .catch(() => {
            serverErrorMsg;
        })
})


// ====== TAG MIDDLEWARE ======

server.get('/users/posts/tags', (req, res) => {
    postDb.getPostTags()
        .then( response => {
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg;
        })
})


server.listen(8000, () => console.log('\n === API running... === \n'))

