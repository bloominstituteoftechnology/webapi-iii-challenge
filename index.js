const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const udb = require('./data/helpers/userDb.js');
const pdb = require('./data/helpers/postDb.js');

const server = express();
server.use(express.json());
server.use(cors({}));

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

const lettering = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
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

// server.post('/users',lettering, (req, res) => {
//     console.log(req.body);
//     const {name} = req.body;
//     udb.insert({name})
//     	.then(response => {
// 	    const {id} = response;
// 	    // res.status(201).json(response);
// 	    udb.get(id)
// 	    	.then(userId => {
// 	    	    if (name.length >= 128 || !name) {
// 	    	    	return res.status(400).json({
// 	    	    	    errorMessage: 'Name must be under 128 characters.'
// 	    	    	});
// 	    	    }
// 	    	       res.status(201).json(userId);
// 	    	});
// 	})
// 	.catch(err => console.error(err));
// });


server.post('/users', (req, res) => {
    const { name } = req.body;
    udb
	.insert({ name })
	.then(response => {
	    res.json(response);
	})
	.catch(err => {
	    console.log(res.body);
	    return errorHelper(500, 'Database boof', res);
	});
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


/*
  in index.js:
  const userRoutes = require('./users/userRoutes.js);
  const configureMiddleware = require('./config/middleware.js);
  configureMiddleware(server);

  in userRoutes.js:
  router.use(usersOnlyMiddleware);

  in middleware.js:
  module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  };
*/
