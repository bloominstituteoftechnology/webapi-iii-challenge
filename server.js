const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const server = express();


server.use(express.json());
server.use(helmet());
server.use(cors());


server.get('/', (req, res) => {
  res.send('Hello')
})


server.use('/users', userRoutes);
server.use('/posts', postRoutes);


server.listen(7000, () => console.log('Hello'))
