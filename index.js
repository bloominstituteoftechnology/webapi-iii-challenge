const express = require('express');
const userRouter = require('./users/userRouter');
const tagRouter = require('./tags/tagRouter');
const postRouter = require('./posts/postRouter');

const configureMiddleware = require('./config/middleware');

const app = express();

configureMiddleware(app);

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tags', tagRouter);
app.use('/api/posts', postRouter);

app.listen(9000, () => console.log('\nThe Server is Alive on 9000!\n'));