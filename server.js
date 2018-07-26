const express = require('express');
const cors = require('cors');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const port = 5000;
const server = express();
server.use(express.json());

server.use(cors({ origin: 'http://localhost:3000'}));

// ========================== custom middleware
const sendUserError = (status, message, res) => {
  res.status(status).json({ error: message });
  return;
}

const sendUserSuccess = (status, obj, res) => {
  res.status(status).json(obj)
}

// ! ====================== GET  
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
  tagDb
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

// ! ====================== POST

server.post('/api/users', (req, res) => {
  const { name } = req.body;
  if ( !name ) return sendUserError(400, "Name is required", res);
  userDb
    .insert({ name })
    .then(result => sendUserSuccess(201, { result }, res))
    .catch(() => sendUserError(500, "User could not be added", res));
})

server.post('/api/posts', (req, res) => {
  const { text } = req.body;
  console.log(userId);
  //console.log('text', req.body.text);
  //if (!text) return sendUserError(400, "Text is required", res);
  postDb
    .insert({ text })
    .then(result => {
      console.log('response', response)
      return sendUserSuccess(201, result, res)
    })
    .catch(() => sendUserError(400, "Post could not be saved", res));
})

server.post('api/tags', (req, res) => {
  const { tag } = req.body;
  if(!tag) return sendUserError(500, "Tag could not be saved", res);
  tagDb
    .insert({ tag })
    .then(result => sendUserSuccess(200, {tag}, res))
    .catch(() => sendUserError(500, "Tag could not be saved", res));
})

// ! ================= GET BY ID

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (!user) return sendUserError(404, "user could not be found", res)
      sendUserSuccess(200, {user}, res)
    })
    .catch(() => sendUserError(500, "The user can not be retrieved"));
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    get(id)
    .then(post => {
      if (!post) return sendUserError(404, "Post could not be found", res);
      sendUserSuccess(200, {post}, res)
    })
    .catch(() => sendUserError(500, "The post could not be retrieved", res))
})

server.get('/api/tags/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      if (!tag) return sendUserError(404, "Tag could not be found", res);
      sendUserSuccess(200, {tag}, res)
    })
    .catch(() => sendUserError(500, "The tag could not be retrieved", res))
})

// ! ================== DELETE

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(() => sendUserSuccess(204, {success: 'user was removed'}, res))
    .catch(() => sendUserError(500, "There was an error deleting the user"));
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(() => sendUserSuccess(204, {success: 'post was removed'}, res))
    .catch(() => sendUserError(500, "There was an error deleting the post"));
})

server.delete('/api/tags/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .remove(id)
    .then(() => sendUserSuccess(204, {success: 'tag was removed'}, res))
    .catch(() => sendUserError(500, "There was an error deleting the tag"));
})

// ! ================== GET POST TAGS BY ID

server.get('/api/posts/:postId/tags', (req, res) => {
  
})




server.listen(port, () => console.log(`server listening on ${port}`));



