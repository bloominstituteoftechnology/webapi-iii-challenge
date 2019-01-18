const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const port = 5000;

const server = express();
server.use(express.json());
server.use(cors({}));

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};


// ==== middleWare ====
const nameCheckMiddleware = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        errorHelper(404, 'Name must be included', res);
        next();
    } else {
        next();
    }
};

// ==== User Endpoints ====

server.get('/api/users', (req, res) => {
    users
     .get()
     .then(foundUsers => {    // This request gets all users contained within the DB.
         res.json(foundUsers);
     })
     .catch(err => {
         return errorHelper(500, 'Database failed to load.', res);
     });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
      .get(id)   
      .then(user => {   // This request gets a user with a specific ID within the DB.
        if (user === 0) {
          return errorHelper(404, 'No user by that Id in the DB', res);
        }
        res.json(user);
      })
      .catch(err => {
        return errorHelper(500, 'Database failed to load.', res);
      });
  });
  

server.get('/api/users/posts/:userId', (req, res) => {
    const { userId } = req.params;
    users
    .getUserPosts(userId)   // This request gets all posts by a specific user within the DB.
    .then(usersPosts => {
        if (usersPosts === 0) {
            return errorHelper(404, 'No posts by that user exist in the DB.', res);
        }
        res.json(usersPosts);
    })
    .catch(err => {
        return errorHelper(500, 'Database failed to load.');
    });
});

server.post('/api/users', nameCheckMiddleware, (req, res) => {
    const { name } = req.body;
    users
    .insert({ name })
    .then(response => {   // This request creates a new user with a unique ID.
        res.json(response);
    })
    .catch(err => {
        return errorHelper(500, 'Database failed to load.', res);
    });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .remove(id)
    .then(userRemoved => { // This request deletes a user with a specific ID from the DB.
        if (userRemoved === 0) {
            return errorHelper(404, 'No user by that Id exists within the DB.');
        } else {
            res.json({ success: 'User Removed' });
        }
    })
    .catch(err => {
        return errorHelper(500, 'Database failed to load.', res);
    });
});

server.put('/api/users/:id', nameCheckMiddleware, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
      .update(id, { name })
      .then(response => {  // This request updates a user with the ID specified in the DB.
        if (response === 0) {
          return errorHelper(404, 'No user by that id');
        } else {
          db.find(id).then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        return errorHelper(500, 'Database failed to load', res);
      });
  });

// ==== POST Endpoints ====

server.get('/api/posts', (req, res) => {
    posts
    .get()
    .then(foundPosts => {
        res.json(foundPosts);
    })
    .catch(err => {
        return errorHelper(500, 'Database failed to load.', res);
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
    .get(id)
    .then(post => {
        if (post === 0) {
            return errorHelper(404, 'No post by that ID exists in the DB.', res);
        }
        res.json(post);
    })
    .catch(err => {
        return errorHelper(500, 'Database failed to load.', res);
    });
});



server.listen(port, () => console.log(`Server listening on ${port}`));
