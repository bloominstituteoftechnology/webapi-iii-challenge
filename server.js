// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');


const server = express();
const port = 5000;

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));


//router handlers
server.get('/', (req, res) => {
  res.send('Hello World you');
});

//User Endpoints - router handlers
server.get('/api/users', (req, res) => {
	userDb.get()
		.then(users => {
			res.status(200).json({users});
		})
		.catch(err => {
			res.status(500).json({error: "Please provide user name."});
		});
})


// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port}`));
