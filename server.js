const express = require('express');
const helmet = require('helmet');
// const db = require('./data/dbConfig');
// const db = require('./data/helpers/userDb');
const userRoutes = require('./users/userRoutes')

const server = express();

//ADD MIDDLEWARE HERE
server.use(helmet());
server.use(express.json());

//USER ROUTES HANDLERS GO HERE
//routes will only care about
//URLs that begin with /api/users
server.use('/api/users', userRoutes);
// server.use(server.router);
// routes.initialize(server);

//TEST TO SEE IF DEFAULT IS WORKING
server.get('/', (req, res) => {
    res.send('Api running');
  });
  


const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));