import express from 'express';
import UserRouter from './Routes/UserRoutes';
import PostRouter from './Routes/PostRoutes';
import TagRouter from './Routes/TagRoutes';

const userRoutes = require('./Routes/userRoutes');

const app = express();
app.use(express.json);
app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/tags', TagRouter);

// server.use(errorHandler);
server.listen(3333, () => console.log('\n== API running on port 3333 ==\n'));
