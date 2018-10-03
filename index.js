// imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb.js');
const db = require('./data/dbConfig.js');

// init server
const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan());
// speak in JSON
server.use(express.json());

function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`)

    next();
}

server.use(logger);

server.get('/', (req, res) => {
    res.send('Hello World!');
})


/*****************************************/
/*** MIDDLEWARE ***/
/*****************************************/

// Make username inputs capitalized
const allCapsName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

// Ensure ID passes as a Number type
const makeNumber = (req, res, next) => {
    req.params.id = Number(req.params.id);
    next();
}

/*****************************************/
/*** USER METHODS ***/
/*****************************************/
// Users GET
server.get('/api/users', (req, res) => {
    userdb.get().then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error getting users data."});
    })
})


// TODO: Server POST method
server.post('/api/users', allCapsName, (req, res) => {
    const name = req.body;
    if(!name){
        res.status(400).json({message: "You must input a name."})
    }

    userdb.insert(name)
    .then(userID => {
        res.status(200).json(userID);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Error adding new user."})
    } )
})


// TODO: Server DELETE method
server.delete('/api/users/:id', makeNumber, (req, res) => {
    const id = req.body;

    userdb.remove(id)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: `Error deleting user with ID ${id}`})
    })
})

// TODO: Server PUT method

server.put('/api/users/:id', (req, res) => {
    const id = req.params;
    const name = req.body;
    if(!name){
        res.status(400).json({message: "Please provide a username."})
    }

    const body = name;

    userdb.update(id, body)
    .then(users => {
        res.status(200).json({users})
    })
    .catch(err => {
        console.log(err);
        res.json({message: `Error updating user ${name}`})
    })
})



/*****************************************/
/*** POSTS METHODS ***/
/*****************************************/

// Posts GET

server.get('/api/posts', (req, res) => {
    postdb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).json({message: "Error getting posts data."})
    })
})


// TODO: Server POST method

// TODO: Server DELETE method

// TODO: Server PUT method

/*****************************************/
/*** TAG METHODS ***/
/*****************************************/

// TODO: Server POST method

// TODO: Server DELETE method

// TODO: Server PUT method

// write a function that will receive three or four arguments.
// add it to the middleware queue.

// Users
// id: number, no need to provide it when creating users, the database will generate it.
// name: up to 128 characters long, required.
// Posts
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.






const port = 8000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})