import express from 'express';
import UserRouter from './Routes/UserRoutes';
import PostRouter from './Routes/PostRoutes';
import TagRouter from './Routes/TagRoutes';

const app = express();
app.use(express.json());
app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/tags', TagRouter);


app.listen(8000, () => console.log('server running on port 8000'));
