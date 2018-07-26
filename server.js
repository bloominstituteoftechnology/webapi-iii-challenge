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
        res.status(404).json({error: "Unable to retrieve posts from the database...  try again."});
        })

});

//tags Endpoints
server.get('/api_v1/tags', (req, res) => {
        const request = dbtag.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve tags from the database...  try again."});
        })

});

//user by id Endpoints
server.get('/api_v1/users/:id', (req, res) => {
        const id = req.params.id;

       const request = dbuser.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve user with specified id" });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve user with specified id"});
        })

});

//posts by id Endpoints
server.get('/api_v1/posts/:id', (req, res) => {
	
	const id = req.params.id;

       const request = dbpost.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve post with specified id" });
         else {
		 response.id = id;
	 res.status(200).json(response);
	 }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve post with specified id"});
        })

});

//tag by id Endpoints
server.get('/api_v1/tags/:id', (req, res) => {
        const id = req.params.id;

       const request = dbtag.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve tag with specified id" });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve tag with specified id"});
        })

});

// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port}`));