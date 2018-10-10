const express = require('express');
const server = express();
const db = require('./data/db.js');
const port = 8080;

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.send('Hope this works!');
});

server.listen(port, () => {
	console.log(`\n=== Server listening on ${port} ===`);
});
