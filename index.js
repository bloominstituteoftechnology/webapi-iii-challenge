const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

const PORT = 4000;
const userDB = require('./data/helpers/userDb')

server.use(
    express.json(),
    helmet(),
    logger('dev'),
)

//endpoints
server.get('/users', (req, res) => {
    userDB.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting users'})
    })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({message: 'That user ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding that Users Posts'})
    })
})
//listener

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})