// import your node modules
const express = require('express');
const dbuser = require('./data/helpers/userDb');
const dbpost = require('./data/helpers/postDb');
const dbtag = require('./data/helpers/tagDb');


const server = express();
const port = 8000;

//middleware
server.use(express.json());
// server.use(helmet());
// server.use(cors({ origin: 'http://localhost:3000' }));

//router handlers
server.get('/', (req, res) => {

  res.send('Hello World <h1> this is a blog app</h1>');
});

//User Endpoints - router handlers
server.get('/api_v1/users', (req, res) => {
        const request = dbuser.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve users from the database...  try again."});
        })

});

//posts Endpoints
server.get('/api_v1/posts', (req, res) => {
        const request = dbpost.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The posts information could not be retrieved."});
        })

});

// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port}`));