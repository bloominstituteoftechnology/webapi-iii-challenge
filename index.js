console.log("Hello from  index.js!");

const express = require('express');
const server = express();
// const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');
// const cors = require('cors');

server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello from your server!!!');
});

//Middleware

//Routes

//GET all users
// server.get('/users', (req, res) => {
//     userDb.get().then(users => {
//         console.log(users);
//         res.json(users);
//     if(!users) {
//         return res.status(500)}
//         res.json({ error: "The posts information could not be retrived."});
//     })
//     .catch(error => res.send(error));
// });

//GET user by id
// server.get('/users/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.get(id).then(user => {
//         if(user.length === 0) {
//             return res.status(404).send({ message: "The user with the specified id does not exist." });
//         }
//         res.status(200).json(user);
//     })
//     .catch(error => res.status(500).send({ error: "The user information could not be retrieved." }));
// });

// //Post new user
server.post('/users', (req, res) => {
    userDb.insert(req.body).then(id => {
        res.status(201).json(id);
    })
    .catach(error => {
        if(!name) {
            return res.status(400).send({ errorMessage: "Please provide a name to create a new user." });
        } else if(!user) {
            res.status(422).send({ Error: `There is no user by this id ${userId}`});
        } else {
            res.status(500).send({ error: "There was an error while saving the new user to the database." });
        }
    })
})



const port = 9000;
server.listen(port, () => console.log(`API running fire circles on this port ${port}`));

// const { name } = req.body;
    // const newUser = { name };
    // userDb.insert(newUser).then(userId => {
    //     const { id } = userId;
    //     userDb.post(id).then(user => {
    //         console.log(user);
    //         res.status(201).send(user);
    //     });