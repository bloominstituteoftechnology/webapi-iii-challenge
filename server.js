const express = require('express');

const apiRouter = require('./api-routes/apiRouter.js')

// const pdb = require('./data/helpers/postDb.js');
// const udb = require('./data/helpers/userDb.js');
// const tdb = require('./data/helpers/tagDb.js');

const server = express();

server.use(express.json());

server.post('/api/tags', function(req, res, next) {
  req.body.tag = req.body.tag.toLowerCase()
  next();
})

server.put('/api/tags', function(req, res, next) {
  req.body.tag = req.body.tag.toLowerCase()
  next();
})

server.use('/api', apiRouter)




// ############## USERS DATA ##############


// server.get('/api/users', (req, res) => {
//   udb.get()
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching users...')
//     console.log(error.message)
//   })
// })
//
// server.get('/api/users/:id', (req, res) => {
//   udb.get(req.params.id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching individual user...')
//     console.log(error.message)
//   })
// })
//
// server.get('/api/users/:id/posts', (req, res) => {
//   udb.getUserPosts(req.params.id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching user posts...')
//     console.log(error.message)
//   })
// })
//
// server.post('/api/users', (req, res) => {
//   let { name } = req.body;
//   let user = {
//     name
//   }
//   udb.insert(user)
//     .then(response => {
//       res.status(200).json(response)
//     })
//     .catch(error => {
//       res.status(404).send('error adding user account...')
//       console.log(error.message)
//     })
//   })
//
// server.delete('/api/users/:id', (req, res) => {
//   const id = Number(req.params.id);
//   udb.remove(id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(404).send("the user could not be removed")
//   })
// })
//
// server.put('/api/users/:id', (req, res) => {
//   let id = req.params.id;
//   let { name } = req.body;
//   let changes = {
//     name
//   }
//   udb.update(id, changes)
//   .then(response => {
//     udb.get(req.params.id).then(response2 => {
//       res.status(200).json(response2)
//     })
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(500).send('Unable to update user information...')
//   })
// })
//
// // ################# POSTS DATA #################
//
// server.get('/api/posts', (req, res) => {
//   pdb.get()
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching posts...')
//     console.log(error.message)
//   })
// })
//
// server.get('/api/posts/:id', (req, res) => {
//   pdb.get(req.params.id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching individual post...')
//     console.log(error.message)
//   })
// })
//
//
// server.get('/api/posts/:id/tags', (req, res) => {
//   pdb.getPostTags(req.params.id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching post tags...')
//     console.log(error.message)
//   })
// })
//
//
// server.post('/api/posts', (req, res) => {
//   let { userId, text } = req.body;
//   let post = {
//     userId,
//     text
//   }
//   pdb.insert(post)
//     .then(response => {
//       res.status(200).json(response)
//     })
//     .catch(error => {
//       res.status(404).send('error adding post...')
//       console.log(error.message)
//     })
//   })
//
// server.delete('/api/posts/:id', (req, res) => {
//   const id = Number(req.params.id);
//   pdb.remove(id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(404).send("the post could not be removed")
//   })
// })
//
// server.put('/api/posts/:id', (req, res) => {
//   let id = req.params.id;
//   let { userId, text } = req.body;
//   let changes = {
//     userId,
//     text
//   }
//   pdb.update(id, changes)
//   .then(response => {
//     pdb.get(req.params.id).then(response2 => {
//       res.status(200).json(response2)
//     })
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(500).send('Unable to update the post...')
//   })
// })
//
// // ################# TAGS DATA #################
//
// server.get('/api/tags', (req, res) => {
//   tdb.get()
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching tags...')
//     console.log(error.message)
//   })
// })
//
// server.get('/api/tags/:id', (req, res) => {
//   tdb.get(req.params.id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     res.status(404).send('error fetching individual tag...')
//     console.log(error.message)
//   })
// })
//
//
// server.post('/api/tags', (req, res) => {
//   let { tag } = req.body;
//   tdb.insert(tag)
//     .then(response => {
//       res.status(200).json(response)
//     })
//     .catch(error => {
//       res.status(404).send('error adding tag...')
//       console.log(error.message)
//     })
//   })
//
// server.delete('/api/tags/:id', (req, res) => {
//   const id = Number(req.params.id);
//   tdb.remove(id)
//   .then(response => {
//     res.status(200).json(response);
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(404).send("the tag could not be removed")
//   })
// })
//
// server.put('/api/tags/:id', (req, res) => {
//   let id = req.params.id;
//   let { tag } = req.body;
//   tdb.update(id, tag)
//   .then(response => {
//     tdb.get(req.params.id).then(response2 => {
//       res.status(200).json(response2)
//     })
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(500).send('Unable to update the tag...')
//   })
// })

server.listen(8000, () => console.log('API Running...'));
