const express = require('express');
const helmet = require('helmet');
// const db = require('./data/dbConfig');
const db = require('./data/helpers/userDb');
const server = express();

server.use(helmet());
server.use(express.json());


//TEST TO SEE IF DEFAULT IS WORKING
server.get('/', (req, res) => {
    res.send('Api running');
  });
  

//USERS USERS USERS USERS


//CREATING USErS = POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('user info', userInfo);

    db
      .insert(userInfo)
      .then(response => {
          res.status(201).json(response);
      })
    //   .catch(err => {
    //     if (err.errno === 19) {
    //       res.status(400).json({ msg: 'WRONG' });
    //     } else {
    //       res.status(500).json({ erro: err });
    //     }
    //   });
});

//GETTING USERS = GET
server.get('/api/users', (req, res) => {
    db.get()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

//GETTING USER POSTS = GET
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    db.getUserPosts(userId)
      .then(users => {
//POSSIBLY ADD res MESSAGE IF NO USER FOUND
// if (users.length === 0) {
//     res.status(404).json({ message: 'user not found' });
//   } else {
//     res.json(users[0]);
//   }
// SOMETHING LIKE THIS ^^^
          res.json(users);
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

//DELETE USERS = DELETE
server.delete('/api/users', (req, res) => {
    const { id } = req.query;
    let user;
    db
      .get(id)
      .then(foundUser => {
          user = { ...foundUser[0] };

    db
      .remove(id)
      .then(response => {
          res.status(200).json(user);
      });
      })

      .catch(err => {
          res.status(500).json({ error: err });
      })
});


//UPDATE USERS = PUT
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    db
      .update(id, update)
      .then(count => {
          if (count > 0) {
              db.get(id).then(users => {
                  res.status(200).json(users[0]);
              });
          } else {
              res.status(404).json({ msg: 'user not found' });
          }
      })
      .catch(err => {
          res.status(500).json(err);
      });
});


const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));