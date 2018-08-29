const express = require('express');
const server = express();
const dbUser = require('./data/helpers/userDb.js');

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog, an express middleware production');
} );

server.get('/api/users', (req, res) => {
    dbUser.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The users information could not be retrieved.' });
    })
})

server.get('/api/users/:id', (req, res) => {
    dbUser.get(req.params.id)
    .then(user => {
        // console.log(user);
        if (!user) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(user);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'Please provide a username.' });
        return;
    }
    dbUser.insert({
        name
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the username to the database' });
        return;
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    dbUser.remove(id)
        .then(count => {
            // console.log(count);
            if (count) {
                res.status(204).json({ message: 'User has been deleted'}).end();
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The user could not be removed' }));
});

server.put('/api/users/:id', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'Please provide the new username.' });
        return;
    }
    dbUser.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(req.body)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
            
        })
        .catch(err => res.status(500).json({ message: 'The user information could not be modified.' }));
});



server.listen(8000, () => console.log('/n== API on port 8k ==/n') );