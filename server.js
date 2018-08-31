const express = require('express');

const server = express();

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const configMiddleware = require('./config/middleware');

configMiddleware(server);


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





// User endpoints
server.use('/api/users', userRoutes);

// Post endpoints
server.use('/api/posts', postRoutes);


server.use(errorHandler);
server.listen(6001, () => console.log('\n-=- Server listening on port 6001 -=-\n'));