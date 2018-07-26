const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');

const express = require('express');
const morgan = require('morgan');

// server
const server = express();

// Error middlware
errorHandler = (err, req, res, next) => {
    if (err) {
        if (err.errno === 19) {
            res.status(400).json({ message: 'Please fill in all required fields.' });
        } else {
            res.status(500).json({ error: 'Something went wrong!' })
        }
    }
}

// middlware
server.use(express.json()); 
server.use(morgan('tiny'));

// routing middlware
server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);

server.use(errorHandler);

server.listen(8000, () => console.log('API running on port 8000'));