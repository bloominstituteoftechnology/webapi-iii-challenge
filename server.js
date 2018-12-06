const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const usersRouter = require('./routers/usersRouter/');
const postsRouter = require('./routers/postsRouter/');


const SERVER = express();
const PORT = process.env.PORT || 3020;

SERVER.use(express.json(), cors(), helmet(), logger('dev'));

SERVER.use('/api/users', usersRouter);
SERVER.use('/api/posts', postsRouter);

SERVER.listen(PORT, () => {
  console.log(`\n~~~~ Server running on PORT:${PORT} ~~~~\n`)
})
