const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const port = 9000;
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const postDb = require('./data/helpers/postDb');

const server = express();

///////////////
// Middlewares
///////////////
server.use(logger('combined'));

///////////////
// Routes
///////////////
// ####### Users #######
server.use('/api/users', userRoutes);

// ####### Posts #######
server.use('/api/posts', postRoutes);

///////////////
// Listen
///////////////
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
