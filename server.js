// import your node modules
const express = require('express');
const dbuser = require('./data/helpers/userDb');


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
server.get('/users', (req, res) => {
        const request = dbuser.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve users from the database...  try again."});
        })

});



// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port}`));