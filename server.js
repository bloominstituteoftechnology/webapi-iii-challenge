//database helpers
const postsDb = require('./data/helpers/postDb.js');
const usersDb = require('./data/helpers/userDb.js');
const tagsDb = require('./data/helpers/tagDb.js');

const express = require('express');
const cors = require('cors');
const port = 5050

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Your server on ${port} is up and running!!`);
})


//-------USERS-----------
server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res overides so we had comment out
    // res.json('testing get');
});

// Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    usersDb
        .get(`${ id }`)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('Success!');
});

// Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    usersDb
        .insert({ name })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing post');
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    usersDb
        .update( id, { name })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    console.log(req.body);
    // res.send('Success!');
});

// // Removes the user with the specified id and returns the deleted user.
// server.delete('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, bio } = req.body;
//     db
//         .remove({ name, bio })
//         .then(users => {
//             res.json({ users });
//         })
//         .catch(error => {
//             res.json({ error });
//         });
//     res.json('testing delete');
// });


// server.post('/api/users', (req, res) => {
//     const { name, bio } = req.body; 
//     console.log(db.insert({ name, bio }));
// });

// get:       /api/users           |       list of users
// get:       /api/users/:id        |    a user matching ID
// post:     /api/users            |    add a user to the users table
// delete:    /api/users/:id        |    delete a user from the users table based on the ID



server.listen( port, () =>
{
    console.log( `Server listening on port ${ port }` );
} )
