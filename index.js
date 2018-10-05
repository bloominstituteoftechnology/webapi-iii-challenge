const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const headers = require('helmet');
const usersRoutes = require('./Users/usersrouters');
const postsRoutes = require('./Posts/postsrouters');

// ~~~~~ SERVER INITIALIZATION ~~~~~ //
const server = express();
server.use(cors());
server.use(logger('combined'));
server.use(headers());
server.use(express.json());


// ~~~~~ MIDDLEWARE ~~~~~ //
const userToUpperCase = (req, res, next) => {
    if(req.body.name) req.body.name = req.body.name.toUpperCase();
    next();
};
server.use(userToUpperCase);

// TODO: User still got inserted into DB despite throwing a 400. Fix this.
const nameLengthCheck = (req, res, next) => {
    if(req.body.name && req.body.name.length > 128) {
        res.status(400).json({"error": "Please ensure your name value is less than 128 characters in length."});
        return;
    }
    next();
};
server.use(nameLengthCheck);

// ~~~~~ ROUTES ~~~~~ //
// ~~ testing, testing. 1, 2. ~~ //
server.get('/', (req, res) => {
    res.status(200).json({"message": "I AM ROOT!"});
});

server.get('/api', (req, res) => {
    res.status(404).json({"error": "Naughty, naughty. Alas, there's nothing here. Quoth the pigeon, 404!"});
});

server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);

// ~~~~~ LISTENER ~~~~~ //
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
