// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');


const server = express();
const port = 5000;

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));


//router handlers
server.get('/', (req, res) => {
  res.send('Hello World');
});

//User Endpoints - router handlers
server.get('/api/users', (req, res) => {
	userDb.get()
		.then(users => {
			res.status(200).json({users});
		})
		.catch(err => {
			res.status(500).json({error: "Please provide user name."});
		});
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDb.get(id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ error: `There is no user with id ${id}`});
        })
        .catch( error => {
            res.status(500).json({ error: `Error in retrieving user with this id ${id}`})
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body
    name ? (
        userDb.insert({ name })
            .then( id => {
                res.status(201)
                userDb.get(id.id)
                    .then( user => {
                        user ? res.status(200).json(user) : res.status(404).json({ Error: `There is no user with id ${id}`})
                    })
                    .catch( error => {
                        res.status(500).json({ error: `Error with retrieving user with this id ${id}`})
                    })
            })
            .catch( error => {
                res.status(500).json({ error: `Error in creating new user with this name '${name}'`})
            })
    ) : (
        res.status(400).json({ Error: "Enter name of user" })
    )
})


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDb.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                userDb.get()
                    .then( users => {
                        res.status(200).json({ users })
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Could not retrieve this user" })
                    })
            } else {
                res.status(404).json({ error: `There is no user with id ${id}`})
            }
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    name ? (
        userDb.update(id, { name })
            .then( response => {
                if (response) {
                    res.status(200)
                    userDb.get(id)
                        .then( user => {
                            user ? res.status(200).json(user) : res.status(404).json({ error: `There is no user with id ${id}`})
                        })
                        .catch( error => {
                            res.status(500).json({ error: `Error in retrieving user with id ${id}`})
                        })
                } else {
                    res.status(500).json({ error: `Unable to update user with id ${id}`})
                }
            })
    ) : (
        res.status(404).json({ error: "Enter name of user"})
    )
});






// server port
server.listen(port, () => console.log(`API listening on port ${port}`));
