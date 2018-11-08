const express = require('express');

const server = express();
const port = 9001;

const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

server.use(express.json());
server.use(toUpperCase);

function toUpperCase(req, res, next) {
    if (req.body.name) {
       req.body.name = req.body.name.toLowerCase();
       let name = req.body.name.substring(1)
       req.body.name = req.body.name[0].toUpperCase() + name
    }
    next();
}

server.get('/api/users', (req, res) => {
    users.get()
         .then(user => {
             res.json(user)
         })
         .catch(err => {
             res.json(500).json({ message: 'error users not found'})
         })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.get(id)
         .then(user => {
             res.status(200).json(user)
         })
         .catch(err => {
             res.status(500).json({ message: 'error no ID matched'})
         })
})

server.post('/api/users', toUpperCase, (req, res) => {
    const { name } = req.body;
    users.insert({ name })
         .then(user => {
             res.status(200).json(user)
         })
         .catch(err => {
             res.status(500).json({ message: 'error unable to create new user'})
         })
})

server.put('/api/users/:id', toUpperCase, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    users.update(id, changes)
    .then(count => {
        if(count) {
            res.status(200).json({ message: `${count} user updated`});
        } else {
            res.status(404).json({ message: 'user not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error updating the user'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'error no user found'})
        })
})


// Posts

server.get('/api/posts', (req, res) => {
    posts.get()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'error posts not found'})
      });
  });

  server.get('/api/posts/:id', (req, res) => {
      const { id } = req.params;
      posts.get(id).then(user => {
          res.status(200).json(user)
      })
      .catch(err => {
          res.status(500).json({ message: "post by that id not found"})
      })
  })

  server.post('/api/posts', (req, res) => {
      const { userId, text } = req.body;
      posts.insert({ userId, text }).then(response => {
          res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({ message: "error can not add new post"})
      })
  })

  server.delete('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        posts.remove(id).then(id => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({ message: "error can not remove post"})
        })
  })

  server.put('/api/posts/:id', (req, res) => {
      const { id } = req.params;
      const changes = req.body;
      posts.update(id, changes).then(response => {
          res.status(200).json(response)
      })
      .catch(err => {
          res.status(500).json({ message: "can not make update changes"})
      })
  })

  server.delete('/api/posts/:id', (req, res) => {
      const { id } = req.params;
      posts.remove(id).then(id => {
          res.status(200).json(id)
      })
      .catch(err => {
          res.status(500).json({ message: "can not delete post with that id"})
      })
  })


server.listen(port, () => console.log(`Server listen to port ${port}`))