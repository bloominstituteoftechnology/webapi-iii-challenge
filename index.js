// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const posts = require('./routers/posts');
const tags = require('./routers/tags');
const users = require('./routers/users');

// init server
const server = express();
const port = 8000;

// opt in
server.use(cors());
server.use(express.json());
server.use(helmet());

// routers
server.use('/api/posts', posts);
server.use('/api/tags', tags);
server.use('/api/users', users);

server.get('/', (req, res) => {
    res.status(200).send('Hello');
});

// catch invalid routes
server.use(function (req, res) {
    res.status(404).json({error: "Ain't nobody got time for that!"});
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
