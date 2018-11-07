const express = require('express');
const dbPost = require('./data/helpers/postDb.js')
const dbTag = require('./data/helpers/tagDb.js')
const dbUser = require('./data/helpers/userDb.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
   console.log('something');
});

server.get('/users', (req, res) => {
    dbUser.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'The users cannot be retrieved.'});
        });
});

server.get('/users/:id', async (req, res) => {
    try {
        console.log('req.params', req.params);
        const { id } = req.params;
        const user = await dbUser.get(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: error });
    } 

});

const port = 9000;

server.listen(port, () => console.log(`\n API running on port ${port} \n`));

