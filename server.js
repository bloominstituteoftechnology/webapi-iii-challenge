const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./data/dbConfig.js');

const postsRouter = require('./routes/posts.js');
const tagsRouter = require('./routes/tags.js');
const usersRouter = require('./routes/users.js');

const server = express();

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/tags', tagsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'It\'s ALIIIIIVE!!'});
  console.log();
});














const port = 5309;
server.listen(port, () => console.log('API Running on port 5309'));
