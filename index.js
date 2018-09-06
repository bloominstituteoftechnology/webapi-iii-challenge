const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js')
const postDb = require('./data/helpers/postDb.js')


server.use(express.json());

function upperName(req, res,next) {
    req.body.name = req.body.name.toUpperCase();
    
    next();
}

server.get('/', (req,res) => {
    res.send('What is this madness?')
});

// users

server.get('/users' , (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.error('error',err);
    })
});

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then((users) => {
        res.status(200).json(users);
    }).catch(err => {
        console.error('error',err);
    })
});


server.post('/users', upperName , (req, res) => {
    userDb.insert(req.body)
    .then((user) => {
      userDb.get(user.id)
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

server.delete('/users/:id', (req , res) => {
    const { id } = req.params; // const id = req.params.id;

    userDb.remove(id)
    .then(count => {
        console.log('count:', count);
        if (count) {
        res.status(204).end();
    } else {
        res.status(200).json({ message: 'No user with this id was found'});
    }
    })
    .catch(err => res.status(500).json(err));
});

server.put('/users/:id', upperName, (req , res) => {
    userDb.update(req.params.id, req.body).then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));  
   })

   // posts

   server.get('/posts', (req, res) => {
    postDb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.error('error',err);

        res.status(500).json({ message:'Error getting the posts'});
    })
});

server.get('/posts/:id', (req, res) => {
    postDb.findById(parseInt(req.params.id)).then(post => {
      console.log(post);
      if (post.length === 0) {
        res.status(404).json({  message: 'The post with the specified ID does not exist.' });
      }
      else {
        res.status(200).json(post)
    }}).catch(err => {
      console.error('error', err);
       res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
  });

  server.post('/posts', (req, res) => {
      if(!req.body.title || !req.body.contents){
          res.status(400).json({errorMessage: 'Please provide title and contents for post.'})
      }
      postDb.insert(req.body).then(id => {
          res.status(201).json(id)
      }).catch(err => {
          console.error('error',err);
          res.status(500).json({error: 'There was an error while saving the post to the database.'})
      })
  });

  server.delete('/posts/:id', (req, res) => {
      const { id } = req.params;

      postDb.remove(id)
      .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist"});
        } else {res.status(200).json(posts);
        }
      })
      .catch(err => {
          res.status(500).json({error: "The post could not be removed"});
      })
  });



  server.put('/posts/:id', (req, res) => {
    postDb.update(req.params.id, req.body).then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));
})






server.listen(2000, () => console.log('\n== API on port 2k ==\n'));