const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const server = express();

server.use(express.json());

// ALL THE GETS

server.get('/users', (req, res) => {
  userDb
    .get()
    .then(response => {
      res
        .status(418)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The user information could not be retrieved.` })
        .end()
    })
})

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(response => {
      if(!response) {
        res
          .status(404)
          .json({ error: `The specified User Id does not exist.` })
          .end()
      } else {
        res
        .status(200)
        .json(response)
        .end()
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The user could not be retrieved.` })
        .end()
    })
})

server.get('/posts', (req, res) => {
  postDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The posts information could not be retrieved.` })
        .end()
    })
})

server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  postDb
    .get(id)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: `The specified Post Id does not exist.` })
        .end()
    })
})

server.get('/tags', (req, res) => {
  tagDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tags information could not be retrieved.` })
        .end()
    })
})

server.get('/tags/:id', (req, res) => {
  const id = req.params.id;
  tagDb
    .get(id)
    .then(response => {
      if(!response) {
        res
        .status(404)
        .json({ error: `The specified Tag ID does not exist.` })
        .end()
      }
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tag information could not be retrieved.` })
        .end()
    })
})

server.get('/users/:id/posts', (req, res) => {
  const id = req.params.id;
  userDb
    .getUserPosts(id)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: `The specified User ID does not exist.` })
        .end()
    })
})

server.get('/posts/:id/tags', (req, res) => {
  const id = req.params.id;
  postDb
    .getPostTags(id)
    .then(response => {
      if(!response[0]) {
        res
        .status(404)
        .json({ error: `The specified Post ID either has no tags or does not exist.` })
        .end()
      }
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tags information could not be retrieved.` })
        .end()
    })
})

// ALL THE POST

server.post('/users', (req, res) => {
  const name = req.body.name;
  const user = { name }
  if(!name) {
    res
      .status(400)
      .json({ error: `Please provide a name.` })
      .end()
  } else if (name.length > 128) {
    res
      .status(400)
      .json({ error: `The name provided is greater than 128 characters.` })
      .end()
  } else {
    userDb
      .insert(user)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The user could not be saved.` })
          .end()
      })
  }
})

server.post('/posts/:userId', (req, res) => {
  const userId = req.params.userId;
  const text = req.body.text;
  const post = { userId, text };
  if(!userId || !text) {
    res
      .status(400)
      .json({ error: `Please provide both the userId and text.` })
      .end()
  } else {
    postDb
      .insert(post)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: `The specified User ID does not exist.` })
          .end()
      })
  }
})

server.post('/tags', (req, res) => {
  const newTag = req.body.tag;
  const tag = { tag: newTag };
  if(!newTag) {
    res
      .status(400)
      .json({ error: `Please provide a tag.` })
      .end()
  } else if(newTag.length > 80) {
    res
      .status(400)
      .json({ error: `The provided tag is greater than 80 characters.` })
      .end()
  } else {
    tagDb
      .get()
      .then(response => {
        response.forEach(tag => {
          if(tag.tag === newTag) {
            res
              .status(400)
              .json({ error: `The provided tag already exist.` })
              .end()
          }
        })
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The tag could not be posted.` })
          .end()
      })
    tagDb
      .insert(tag)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The tag could not be posted.` })
          .end()
      })
  }
})

// ALL PUTS

server.put('/users/:userId', (req, res) => {
  const id = req.params.userId;
  const newName = req.body.name;
  const name = { name: newName };
  if(!id || !newName ) {
    res
      .status(400)
      .json({ error: `Please provide a User ID and Name.` })
      .end()
  } else if(newName.length > 128) {
    res
      .status(400)
      .json({ error: `The name provided is greater than 128 characters.` })
      .end()
  } else {
    userDb
      .update(id, name)
      .then(response => {
        if(!response) {
          res
            .status(404)
            .json({ error: `The specified User ID does not exist.` })
            .end()
        } else {
          userDb
            .get(id)
            .then(response => {
              res
                .status(200)
                .json(response)
                .end()
            })
            .catch(() => {
              res
                .status(404)
                .json({ error: `The specified User Id does not exist.` })
                .end()
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json(err)
          .end()
      })
  }
})

server.put('/posts/:postId', (req, res) => {
  const id = req.params.postId;
  const text = req.body.text;
  const post = { text };
  if(!text) {
    res
      .status(400)
      .json({ error: `Please provide the text to update.` })
      .end()
  } else {
    postDb
      .update(id, post)
      .then(response => {
        if(!response) {
          res
            .status(404)
            .json({ error: `The ID specified could not be found.` })
            .end()
        } else {
          postDb
            .get(id)
            .then(response => {
              res
                .status(200)
                .json(response)
                .end()
            })
            .catch(() => {
              res
                .status(404)
                .json({ error: `The specified Post Id does not exist.` })
                .end()
            })
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The post could not be updated.` })
          .end()
      })
  }
})

server.put('/tags/:tagId', (req, res) => {
  const id = req.params.tagId;
  const newTag = req.body.tag;
  const tag = { tag: newTag };
  if(!newTag || !id) {
    res
      .status(400)
      .json({ error: `Please provide tag ID and text.` })
      .end()
  } else {
    tagDb
      .update(id, tag)
      .then(response => {
        if(!response) {
          res
            .status(404)
            .json({ error: `The specified ID could not be found.` })
            .end()
        } else {
          tagDb
            .get(id)
            .then(response => {
              if(!response) {
                res
                .status(404)
                .json({ error: `The specified Tag ID does not exist.` })
                .end()
              }
              res
                .status(200)
                .json(response)
                .end()
            })
            .catch(() => {
              res
                .status(500)
                .json({ error: `The tag information could not be retrieved.` })
                .end()
            })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err })
          .end()
      })
  }
})

server.listen(8000, () => console.log(`... API is running on port 8000 ...`));