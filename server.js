//import all dependency's here:
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userDb from './data/helpers/userDb.js';
import postsDb from './data/helpers/postDb.js';
import tagsDb from './data/helpers/tagDb.js';

const port = 5000;
const server = express();

// create custom middleware here:


// apply middleware here:
server.use(helmet());
server.use(cors());
server.use(express.json());

// add route handlers:

// create route handlers here:
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      postsDb.get()
        .then(posts => {
          users.map(user => {
            user.posts = [];
            posts.map((post) => {
              if(post.userId === user.id){
                user.posts.push(post);
              }
            })
          })
          res.json(users);
        })
    });
})

server.get('/api/posts', (req, res) => {
  postsDb.get()
    .then(posts => {
      res.json(posts);
    });
})
server.get('/api/tags/', (req, res) => {
  tagsDb.get()
    .then(tags => {
      res.json(tags);
    })
})
server.listen(port, () => {
  console.dir(`server listening on port ${port}`);
})
