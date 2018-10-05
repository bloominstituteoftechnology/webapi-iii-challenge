const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const userRoutes = require('./Routes/userRoutes')
const postRoutes = require('./Routes/postRoutes')

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.listen(port, () => console.log(`server running on port ${port}`));




