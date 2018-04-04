const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());




server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);



server.get('/', (req, res) => {
    res.send('Server is runnig...');
});







const port = 5000;
server.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});