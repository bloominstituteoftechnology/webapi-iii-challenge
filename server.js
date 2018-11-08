const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDB');
const userDb = require('./data/helpers/userDb');

const port = 8000;
const server = express();
server.use(express.json()); 

const upperCaser = (req, res, next) => {
    const { name } = req.body;
    if (name === name.toUpperCase()) {
        next();
    } else {
        name.toUpperCase();
    }
}

server.get('/api/users)', (req, res) => {
    users
        .get()
        .then(userList => {
            res.json(userList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error"});
        })
}

)





server.listen(port, () => console.log(`Server listening at port ${port}`));