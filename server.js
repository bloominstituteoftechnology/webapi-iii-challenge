// express
const express = require('express');
const db = require('./data/helpers/postDb.js');
const db1 = require('./data/helpers/tagDb.js');
const db2 = require('./data/helpers/userDb.js');

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');


server.use(cors({ origin: 'http://localhost:3000' }));


const customLogger = (req, res, next) => {
    
}

server.post('/api/users', (req, res) => { 
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'No name' });

     }
    users
        .insert({ name })
        .then(id => { 
            res.status(201).send(id)
        })
        .catch(err => { 
            console.log(err)
        })

})


//Get
server.get(`/api/users`, (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => console.log(error));

})



//Put
server.put(`api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name });
        .then(count => { 
            if (count !== 1) {
                res.status(400).json({ errorMessage: 'Did not Update' });
            } else {
                res.status(201).json({ id, name });
            }

        })
            .cath(err => {
                console.log(err);
        })
    
})

server.delete('/api/users/:id', (req, res) => { 
    const { id } = req.params;
    users
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete' });
            } else {
                res.status(201).json({ message: 'success DELETION' });
            }

        })
        .catch (err => {
            console.log(err);
        })


})

server.listen(port, () => console.log(`Server running on port ${port}`));