const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const postdb = require('./data/helpers/postDb.js');
const tabdb = require('./data/helpers/tagDb.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Hello FSW12');
});

server.get('/api/users', (req, res) => {
    userDB.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error"});
    });
});

server.post('/api/users', (req, res) => {
    
    userDB.insert(req.body).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error"});
    });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDB.remove(id)
        .then(response => {
            console.log(response);
            if(response) {
                res.status(204).end();
            }
            else {
                res.status(404).json({ message: 'No user with this id found'});
            }
            res.status(204).end();
        })
        .catch(err => res.status(500).json(err));
});

server.put('/api/users/:id', (req, res) => {
    userDB.update(req.params.id, req.body).then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ message: 'update failed' }));
});

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));