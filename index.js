//imports
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');

const userRouter = require('./routers/user_router');
const postRouter = require('./routers/post_router');

const server = express();
const PORT = 3000;

//middleware
server.use(
  express.json(),
  logger('tiny'),
  helmet(),
);

//requests
server.use('/api/users', userRouter);

server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Couldn't find any posts" })
    })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb.get(id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'})
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error with database"})
    })
})

server.post('/api/posts', (req, res) => {
  const body = req.body;
  if  (body.text && body.userId) {
    postDb.insert(body)
      .then(postId => {
        res.json(postId)
      })
      .catch(err => {
        res
          .status(500)
          .json({error: "Problem with the database"})
      })
  } else {
    res
      .status(400)
      .json({message: ' Please include a user ID and text'})
  }
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
  .then(count => {
    if (count) {
      res.json({count})
    } else {
      res
        .status(404)
        .json({ error: "Post with specified ID does not exist"})
    }
  })
  .catch(err => {
    res
      .status(500)
      .json({error: "Database Error"})
  })
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  
  if (body.text) {
    postDb.update(id, body)
      .then(count => {
        if (count) {
          res.json({ count })
        } else {
          res
            .status(404)
            .json({message: "Post with the specified ID does not exist"})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({error: "Database go boom"})
      })
  } else {
    res
      .status(400)
      .json({ message: "Please include a user ID and text to update"})
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});