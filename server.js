const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const server = express();


function errorHandler(err, req, res, next) {
    console.error('error:', err);
    switch(err.status) {
        case 400:
            res.status(400).json({errorMessage: 'Please provide the required information.'})

        case 404:
            res.status(404).json({errorMessage: 'The requested resource could not be found.'});
            break;

        default:
            res.status(500).json({errorMessage: 'There was an error performing the requested operation.'});
            break;
    }
}

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(logger('dev'));
server.use(helmet());



// User endpoints
server.use('/api/users', userRoutes);

// Post endpoints
server.use('/api/posts', postRoutes);


server.use(errorHandler);
server.listen(6001, () => console.log('\n-=- Server listening on port 6001 -=-\n'));