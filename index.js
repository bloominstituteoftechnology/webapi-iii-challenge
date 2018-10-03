const express = require('express');

const cors = require('cors');

// const bodyParser = require('body-parser');

const userDb = require('./data/helpers/userDb'); 

const postDb = require('./data/helpers/postDb');

const server = express();

const logger = (req, res, next) => {

    console.log(`${Date.now()} ${req.method} made to ${req.url}`);
    next();
};
///////MIDDLEWARE//////
server.use(logger);

// server.use(bodyParser);

server.use(cors());


/////USER ROUTES////////
server.post('/users', (req, res) => { 
    console.log(req.body);
    const { name } = req.body;
    const newUser = { name };
    userDb
    .insert(newUser)
    .then(userId => {
        const { id } = userId;
        userDb
        .getUserPosts(id)
        .then(user => {
            console.log(user);
            if(!user) {
                return res
                .status(422)
                .send({ Error: `Id (${id} not found )`});
            }
        res.status(201).json(user);
        });
    })
    .catch(err => console.error(err))
});

server.get('/', (req, res) => {
    res
    .status(200)
    .send('<h1> This ain^t no disco. </h1>')
});

server.get('/users',(req, res) => {
    userDb
    .get()
    .then(users => {
        console.log(`\n** users **`, users);
    res
    .json(users);
    })
    .catch(err => res.send(err))
});

server.put('/users/:id', (req, res) => {
    console.log(req.query);
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
        console.log(newUser);
    userDb
    .update(id, newUser)
    .then(user => {
        console.log(user);
        res.status(200).json(user);
    })
    .catch(err => console.error(err));
})

server.delete('users/:id', (req, res) => {
    const { id } = req.params;
    console.log(params);
    userDb
    .remove(id)
    .then(removedUser => {
        console.log(removedUser);
        res
        .status().send(removedUser);
    })
    .catch(err => console.log(err))
});

////POST ROUTES//////




const port = 8000;

server.listen(port, () =>
console.log(`\n=== API is jammin on ${port} === \n`))