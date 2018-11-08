const express = require('express');
const server = express();

// bringing in the routers from the routers folder
const userRouter = require('./routers/UserRouter');
const postRouter = require('./routers/PostRouter');

// middleware moved to middleware.js inside config folder
const configureMiddleware = require('./config/middleware');
configureMiddleware(server);
 
// adding a default GET at the root to tell folks the API is live.
server.get('/', (req,res) => res.send({"Users API": "live", "Posts API": "live", "Tags API": "not live"}));

// getting the server to use the routers
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

// Server Listening on Port 9000
server.listen(9000, () => console.log('Server running on port 9000'));