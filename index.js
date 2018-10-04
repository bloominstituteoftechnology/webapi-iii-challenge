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

// server.get('/posts/:id', (req, res) => {
//     pdb.get(req.params.id)
// 	.then(posts => {
// 	    if (req.params.userId) {
// 		res.json(posts);
// 	    } else {
// 		console.log('no user with that ID exists');
// 	    }
// 	    console.log(`\n ** posts ** \n`, posts);
// 	})
// 	.catch(err => res.status(500).send(err));
// });

server.get('/users/:id', (req, res) => {
    udb.get(req.params.id)
	.then(users => {
	    console.log(`\n ** users ** \n`, users);
	    res.json(users);
	})
	.catch(err => res.status(500).send(err));
});

server.post('/users',lettering, (req, res) => {
    console.log(req.body);
    const {name} = req.body;
    udb.insert({name})
    	.then(response => {
	    const {id} = response;
	    // res.status(201).json(response);
	    udb.get(id)
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


//===============POSTS===============

server.get('/posts', (req, res) => {
    console.log(req.body);
    pdb.get()
	.then(serverPosts => {
	    res.json(serverPosts);
	})
	.catch(err => res.status(500).send(err));
});

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    const thisId = {id};
    console.log(thisId);
    pdb.get(req.params)
	.then(post => {
	    console.log(`\n ** post ** \n`, post);
	    res.json(post);
	})
	.catch(err => {
	    res.status(500).send(err);
	});
});

server.get('/users/posts/:userId', (req, res) => {
  const { userId } = req.params;
  udb.getUserPosts(userId)
    .then(usersPosts => {
      if (usersPosts === 0) {
        return errorHelper(404, 'That user doesnt have any posts', res);
      }
      res.json(usersPosts);
    })
    .catch(err => {
      return errorHelper(500, 'Database error', res);
    });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  pdb
    .get(id)
    .then(post => {
      if (post === 0) {
        return errorHelper(404, 'No post by that Id in the DB', res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, 'Database boof', res);
    });
});

server.post('/posts', (req, res) => {
    console.log(req.body);
    const {userId, text} = req.body;
    pdb.insert({userId, text})
    	.then(myId => {
	    const {id} = myId;
	    // res.status(201).json(response);
	    pdb.get(id)
	    	.then(response => {
	    	       res.status(201).json(response);
	    	});
	})
	.catch(err => console.error(err));
});

server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    pdb.remove(id)
	.then(removedPost => {
	    console.log(removedPost);
	    res.status(200).json(removedPost);
	})
	.catch(err => res.status(404));
});

server.put('/posts/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const newPost = {name};
    udb.update(id, newPost)
	.then(post => {
	    res.status(200).json(post);
	})
	.catch(err => console.log(err));
});








//===============LISTENING===============

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
