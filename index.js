const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const udb = require('./data/helpers/userDb.js');
let userId = 1;

const lettering = (req, res, next) => {
    req.user = req.params.user.toUpperCase();
    next();
};

server.get('/users', (req, res) => {
    console.log(req.body);
    udb.get()
	.then(users => {
	    console.log(`\n ** users ** \n`, users);
	    res.json(users);
	})
	.catch(err => res.status(500).send(err));
});

// server.get('/users/:id', (req, res) => {
//     udb.findById(req.params.id)
// 	.then(users => {
// 	    console.log(`\n ** users ** \n`, users);
// 	    res.json(users);
// 	})
// 	.catch(err => res.status(500).send(err));
// });

server.post('/users', (req, res) => {
    console.log(req.body);
    const {name} = req.body;
    const newUser = {name};
    console.log(newUser);
    udb.insert(req.body)
    	.then(insertedUser => {
	    const {id} = userId;
	    udb.findById(id)
		.then(userId => {
		    if (name.length >= 128 || !name) {
		    	return res.status(400).json({
		    	    errorMessage: 'Name must be under 128 characters.'
		    	});
		    }
		    res.status(201).json(userId);
		});
	})
	.catch(err => console.error(err));
});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    udb.remove(id)
	.then(removedUser => {
	    console.log(removedUser);
	    res.status(200).json(removedUser);
	})
	.catch(err => res.status(404));
});

server.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const newUser = {name};
    udb.update(id, newUser)
	.then(user => {
	    res.status(200).json(user);
	})
	.catch(err => console.log(err));
});

const port = 8003;
server.listen(port, () => {
    console.log(`\n === ${port} === \n`);
});
