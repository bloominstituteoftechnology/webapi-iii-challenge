const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/postRouter');
const tagRouter = require('./tags/tagRouter');
const userRouter = require('./users/userRouter');

const server = express();

// custom middleware
// const tagsToUpperCase = (req, res, next) => {
//   const tag = req.body.tag;
//   if (tag) {
//     tag = tag.tagsToUpperCase;
//   }

//   next();
// };

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(tagsToUpperCase);

server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
