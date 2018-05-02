const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./users/usrRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/users', userRoutes);

server.get('/', (req,res) => {
    res.json({api: 'This api server is running, and ready for requests'});
});

const port = 7000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));