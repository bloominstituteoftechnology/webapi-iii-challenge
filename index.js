console.log("Hello from  index.js!");

const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb.js');

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());
//Middleware

const timeStamp = (req, res, next) => {
    console.log(`${Date.now()} ${req.method} made to ${req.url}`)
    next();
}; //documentation timestamp to url with what method GET, PUT, etc

const upperCase = (req, res, next) => {
    const newName = req.params.name.toUpperCase();
    req.name = newName;
    next();
};

//Routes

server.get('/', (req, res) => {
    res.send('Hello from your server!!!');
});

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
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser).then(userId => {
        const { id } = userId;
        userDb.findById(id).then(user => {
            res.status(201).json(id);
        })
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

//Delete
// server.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.remove(id).then(deletedUser => {
//         if(!deletedUser) {
//             return res.status(404).send({ Error: "The user with the specified ID does not exist." });
//         } else {
//             res.status(200).json({ message: "You successfully deleted the user." });
//         }
//     })
//     .catch(error => res.status(500).send({ error: "The user failed to delete." }));
//  });

//Update
// server.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     const newUser = { name };
//     userDb.update(id, newUser).then(user => {
//         console.log(user);
//         if(!name) {
//             res.status(400).send({ errorMessage: "Please provide a name for the user." })
//         } else if (!user) {
//             res.status(404).send({ message: "The user with the specified ID does not exist." })
//         } else {
//             res.status(200).json(req.body);
//         }})
//         .catch(error => res.status(500).send({ error: "User information could not be modified."}))
//     });
 

const port = 9000;
server.listen(port, () => console.log(`API running crazy fire circles on this port ${port}`));

// const { name } = req.body;
    // const newUser = { name };
    // userDb.insert(newUser).then(userId => {
    //     const { id } = userId;
    //     userDb.post(id).then(user => {
    //         console.log(user);
    //         res.status(201).send(user);
    //     });