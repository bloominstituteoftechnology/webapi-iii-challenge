const server = require('./api/server.js');
const userDb = require('./data/helpers/userDb');
const upperCaseThat = require('./middleware/upperCaseThat');
const userRouter = require('./users/userRouter.js');
const postsRouter = require('./posts/postsRouter');

const port = 9000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));

//USER METHODS
server.use('/api/users/', userRouter);
server.get('/api/users/:id', userRouter);
server.post('/api/users', userRouter);
server.delete('/api/users/:id', userRouter);
server.put('/api/users/:id', userRouter);

//POSTS METHODS
server.use('/api/posts/', postsRouter);
server.get('/api/posts/:id', postsRouter);
server.post('/api/posts', postsRouter);
server.delete('/api/posts/:id', postsRouter);
server.put('/api/posts/:id', postsRouter);
