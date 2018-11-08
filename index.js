const express = require('express');
const userDb = require('./data/helpers/userDb');


const configureMiddleware = require('./config/middleware');

const app = express();

configureMiddleware(app);

app.use(express.json());

const userUpperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

app.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The user information could not be retrieved."
        });
    });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user === 0) {
        res.status(404).json({ error: 'No user by that Id in the DB'}, res);
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Server Error'}, res);
    });
});


// app.get('/api/users/posts/:userId', (req, res) => {
//   const { userId } = req.params;
//   userDb
//     .getUserPosts(userId)
//     .then(usersPosts => {
//       if (usersPosts === 0) {
//         return errorHelper(404, 'No posts by that user', res);
//       }
//       res.json(usersPosts);
//     })
//     .catch(err => {
//       return errorHelper(500, 'Database boof', res);
//     });
// });

app.post('/api/users', userUpperCase, async (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  try {
    const userData = req.body;
    const userId = await userDb.insert(userData);
    res.status(201).json(userId);
  } 
  catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
      error
    })
  }
});

app.put('/api/users/:id', userUpperCase, (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  const changes = req.body;
  const { id } = req.params;
  userDb.update(id, changes).then(count =>
    res.status(200).json(count)
  ).catch(error => {
    res.status(500).json({
      message: 'error updating post',
      error
    })
  })
});

app.delete('/api/users/:id', (req, res) => {
  userDb.remove(req.params.id).then(count => {
    res.status(200).json(count)
  }).catch(error => {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
      error
    })
  })
});

app.listen(9000, () => console.log('\nThe Server is Alive on 9000!\n'));