// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiRouter = require('./routers/indexRouter');

// init server
const server = express();
const port = 8000;

// mount middleware
server.use(cors());
server.use(express.json());
server.use(helmet());

// api router
server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.status(200).send('Hello');
});

// catch invalid routes
server.use(function (req, res) {
    res.status(404).json({error: "Ain't nobody got time for that!"});
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
