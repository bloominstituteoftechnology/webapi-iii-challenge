const express = require('express');
const cors = require('cors');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const port = 5000;
const server = express();
server.use(express.json());

server.use(cors({ origin: 'http://localhost:3000'}));

// middleware
const sendUserError = (status, message, res) => {
  res.status(status).json({ error: message });
  return;
}

const sendUserSuccess = (status, obj, res) => {
  res.status(status).json(obj)
}

// ! ====================== USERS 
server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then(users => {
      console.log(users);
      if (users.length === 0) {
        sendUserError(404, "users could not be found", res);
      } else {
        res.status(200).json({ users });
      }
    })
    .catch(err => {
      sendUserError(500, "There was an error in getting users", res)
      return;
    });
})

server.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then(posts => {
      if (posts.length === 0) {
        sendUserError(404, "Posts could not be found", res)
      }
      sendUserSuccess(200, { posts }, res);
    })
    .catch(err => {
      sendUserError(500, "There was an error in getting users", res)
    });
})

server.get('/api/tags', (req, res) => {
  postDb
  .get()
  .then(tags => {
    if (tags.length === 0) {
      sendUserError(404, "Tags could not be found", res)
    }
    sendUserSuccess(200, { tags }, res);
  })
  .catch(err => {
    sendUserError(500, "There was an error in getting tags", res)
  });
})


server.listen(port, () => console.log(`server listening on ${port}`));



