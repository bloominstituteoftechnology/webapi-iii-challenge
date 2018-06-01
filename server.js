const express = require("express");
const CORS = require("cors");

const posts = require("./data/helpers/postDb.js");
const users = require("./data/helpers/userDb.js");
const tags = require("./data/helpers/tagDb.js");
const port = 5000;

const server = express();

server.use(express.json());
server.use(CORS({}));
server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');


const generalErrorHelper = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};


const nameMiddleWare = (req, res, next) => {
    
  const { name } = req.body;
  if (!name) {
      generalErrorHelper(404, 'Name Must be included, res');
      next();
  } else {
    next()
  }
};

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(getUsers => {
      res.json(getUsers);
    })
    .catch(error => {
        generalErrorHelper(500, "The users information could not be retrieved.", res);
    });
});

server.post("/api/users", nameMiddleWare, (req, res) => {
  const { name } = req.body;
    if (!name) {
        generalErrorHelper(500, 'No name found', res)
        return;
    }
    users
        .insert({name})
        .then(id => {
            res.status(201).send(id)
        })
        .catch(error => {
            generalErrorHelper(500, "The users information could not be retrieved.", res)
        })
});



server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if (user === 0  ){
                return generalErrorHelper(404, 'User does not exist', res);
            }
            res.json(user);
        })
            .catch(err => {
                return generalErrorHelper(500, 'Database error', res);
            });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, {name})
        .then(count => {
            if(count === 0){
                res.status(404).json({errorMessage: 'Failed to update'});
            } else {
                db.find(id).then(user => {
                    res.json(user);
                });
            }
        })
        .catch(error => {
            console.log('Error:', error)
        })
});

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({errorMessage: 'Failed to delete'});
            } else {
                res.status(201).json({message: 'Successfully deleted'});
            }
        })
        .catch(error => {
            console.log('Error:', error);
        })
});




server.listen(port, () => console.log(`Server listening on ${port}`));