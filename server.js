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
            user ? res.status(200).json(user) : res.status(404).json({ userError: `There is no user with id ${id}`});
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











// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port}`));
