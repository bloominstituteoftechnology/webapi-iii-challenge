const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const tagRoutes = require('./api/tags');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API works' });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

app.listen(8000, () => {
  console.log('=== SERVER LISTENING ===');
});
