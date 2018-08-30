const express = require('express');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const bodyParser = require('body-parser');

const server = express();


server.use(cors());
server.use(bodyParser.json());

function upperName(req, res, next) {
  req.body.name = req.body.name.toUpperCase();

  next();
}

server.get('/users', (req, res) => {
  userDb.get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log('err ', err);
    })
});

server.get('/users/:id', (req, res) => {
  userDb.get(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log('err ', err);
    })
});

server.get('/users/posts/:id', (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

server.post('/users', upperName, (req, res) => {
  userDb.insert(req.body)
    .then((result) => {
      userDb.get(result.id)
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
});

server.put('/users/edit/:id', upperName, (req, res) => {
  userDb.update(req.params.id, req.body)
    .then((result) => {
      console.log('result', result);
      res.status(200);
    })
    .catch((err) => {
      console.log('err', err);
    })
});

server.delete('/users/:id', (req, res) => {
  userDb.remove(req.params.id)
    .then((result) => {
      res.status(200).send('');
    })
    .catch((err) => {
      console.log(err);
    })
});

//Posts
server.get('/posts', (req, res) => {
  postDb.get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log('err ', err);
    })
});

server.get('/posts/:id', (req, res) => {
  postDb.get(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log('err ', err);
    })
});

server.post('/posts', (req, res) => {
  postDb.insert(req.body)
    .then((result) => {
      postDb.get(result.id)
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
});

server.put('/posts/edit/:id',  (req, res) => {
  postDb.update(req.params.id, req.body)
    .then((result) => {
      console.log('result', result);
      res.status(200).json({message: 'success'});
    })
    .catch((err) => {
      console.log('err', err);
    })
});

server.delete('/posts/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then((result) => {
      res.status(200).json({message: 'success'});
    })
    .catch((err) => {
      console.log(err);
    })
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
