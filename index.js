const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

//============USERS============

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The users information could not be retrieved"});
    });
});

server.get('/api/users/:id', (req, res) => {
  userDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The user information could not be retrieved"});
    });
});

server.post('/api/users',(req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128) {
    res.status(400)
      .json({ message: "Please provide a user name up to 128 characters long"});
    return;
  }
  userDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "There was an error saving user to the database"});
    });
});

server.delete('/api/users/:id', (req,res) => {
  userDb.remove(req.params.id)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist"});
      } else {
        res.status(200);
      }
    });
});

server.put('/api/users/:id', (req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128) {
    res.status(400)
      .json({ message: "Please provide a user name up to 128 characters long"});
    return;
  }
  userDb.update(req.params.id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    })
    .catch(() => {
      res.status(500)
        .json({ error: "The user information could not be modified"});
    });
});

server.get('/api/users/:userId/posts', (req, res) => {
  userDb.getUserPosts(req.params.userId)
    .then(response => {
      if (response.length === 0) {
        res.status(404)
          .json({ message: "There are no posts associated with the specified user" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The posts could not be retrieved" });
    });
});

//============Posts============

server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The posts information could not be retrieved"});
    });
});
 
server.get('/api/posts/:id', (req, res) => {
  postDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The post information could not be retrieved"});
    });
});
 
server.post('/api/posts', (req, res) => {
  if (!req.body.text || !req.body.userId) {
    res.status(400)
      .json({ message: "Please enter a user id and some text to post" });
    return;
  }
  postDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(() => {
      res.status(500)
        .json({error: "There was an error while saving the post to the database" })
    })
})

server.delete('/api/posts/:id', (req,res) => {
  postDb.remove(req.params.id)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    });
});

server.put('/api/posts/:id', (req, res) => {
  postDb.update(req.params.id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json({ error: "The user information could not be modified"});
    });
});
 
server.get('/posts/:id/tags/', (req, res) => {
  const id = req.params.id;
  postDb.get(id)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
      } else {
        postDb.getPostTags(id)
          .then(response => {
            if (response.length === 0) {
              res.status(404)
                .json({ message: "There are no tags associated with the specified post" });
            } else {
              res.status(200).json(response);
            }
          })
          .catch(err => {
            res.status(500).json({ error: "The posts could not be retrieved" });
          });
      };
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved" });
    });
});

server.listen(8000, () => console.log('API running on port 8000'));