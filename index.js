const express = require('express');

const db = require('../dbConfig.js');

const server = express();

//middleware

server.use(express.json());

//routes
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ error: "The user information could not be retrieved." })
        });
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.find(id)
        .then(count => {
            if(count) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }));
});

server.user('/users', async (req, res) => {
    const user = req.body;
    if(user.title && user.contents) {
        try {
            const response = await db.insert(user);
            res.status(201).json(user);
        } catch(err) {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the user." });
    }
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The user could not be removed" }));
});

server.put('/users/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(users => {
            res.status(200).json(user);
            if(!user.title || !user.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the user." });
            }
            if(!count) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The user information could not be modified." }))
})

server.listen(7000, () => console.log('\n== API on port 7k ==\n'));