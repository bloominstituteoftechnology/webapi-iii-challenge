const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const user = require('./data/helpers/userDb');
const port = 8000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/users', (req, res) => {
    const { id } = req.params;
    user.get(id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the users", error: err });
      });
  });
  
  server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    user.get(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the user", error: err });
      });
  });

  



server.listen(port, () => console.log(`\nApi running on port ${port}\n`));