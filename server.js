//imports
const express = require('express');
const morgan = require('morgan');




//import routes
const apiRoutes = require('./api/api');

//initialize server
const server = express();


//middleware
server.use(express.json());
server.use(morgan('dev'));

//external routers
server.use('/api', apiRoutes);

server.listen(8000, () => console.log('\n ====API RUNNING===\n'))