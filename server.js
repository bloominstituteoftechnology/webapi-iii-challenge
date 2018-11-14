const express = require('express');
const cors = require('cors');
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const db = require('./data/helpers/userDb');
const port = 8000;

const server = express();
server.use(express.json());
server.use(cors({}));

const errorMsg = (status, msg, res) => {
  res.status(status).json({ error: msg })
};

const middlewareNameCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorMsg(404, 'Must include a name', res);
    next();
  } else {
    next();
  }
}

server.get('/api/users', (req, res) => {
  users
    .get()
    .then(foundUsers => {
      res.json(foundUsers)
    })
    .catch(err => {
      return errorMsg(500, 'Try Again', res)
    })
})

server.post('/api/users', middlewareNameCheck, (req, res) => {
  const { name } = req.body;
  users
    .insert({ name })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      return errorMsg(500, 'Try Again')
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then(user => {
      if (user === 0) {
        return errorMsg(404, 'Cannot find user by that id', res)
      }
      res.json(user);
    })
    .catch(err => {
      return errorMsg(500, 'Try Again', res)
    })
})

server.get('/api/users/posts/:userId', (req, res) => {
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(userPosts => {
      if (userPosts === 0) {
        return errorMsg(404, 'Cannot find post', res);
      }
      res.json(userPosts);
    })
    .catch(err => {
      return errorMsg(500, 'Try Again', res)
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(userRemoved => {
      if (userRemoved === 0) {
        return errorMsg(404, 'Cannot find that user');
      } else {
        res.json({ success: 'User Removed' });
      }
    })
  .catch(err => {
    return errorMsg(500, 'Try Again', res);
  })
})

server.put('/api/users/:id', middlewareNameCheck, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users
    .update(id, { name })
    .then(response => {
      if (response === 0) {
        return errorMsg(404, 'Cannot find that user');
      } else {
        res.json({ success: 'User Updated' });
      }
    })
  .catch(err => {
    return errorMsg(500, 'Try Again', res)
  })  
})








server.listen(port, () => console.log(`Server listening on ${port}`));