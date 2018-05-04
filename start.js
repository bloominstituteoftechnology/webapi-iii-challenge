// DEPENDENCIES
import express from 'express';
const server = express();


// ROUTER SETUP
import userRoutes from './routers/userRoutes';
import tagRoutes from './routers/tagRoutes';
import postRoutes from './routers/postRoutes';

server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/tags', tagRoutes);
server.use('/api/posts', postRoutes);

server.use(express.json());

// GET SETUP
server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 3000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));