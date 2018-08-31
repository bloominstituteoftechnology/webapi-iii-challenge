const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./users/usersRoutes.js');
const postRoutes = require('./posts/postsRoutes.js');
const { nameCheckNLimit, errorHandler } = require('./config/middleware.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


app.listen(9000, () => console.log("Listening on 9000"));