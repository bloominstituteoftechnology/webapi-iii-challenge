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
        const { id } = req.params;
        const user = await dbUser.get(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err });
    } 

});

server.post('/users/', async (req, res) => {
    try {
        const userData = req.body;
        const insertedId = await dbUser.insert(userData);
        res.status(201).json(insertedId);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

server.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCount = await dbUser.remove(id);
        res.status(200).json(`Users deleted: ${deleteCount}`);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

server.put('/users/:id', async (req, res) => {
    try {
        const userData = req.body;
        const { id } = req.params;
        const updateCount = await dbUser.update(id, userData);
        res.status(200).json(`Users updated: ${updateCount}`);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

const port = 9000;

server.listen(port, () => console.log(`\n API running on port ${port} \n`));

