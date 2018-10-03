const express = require('express');
const cors = require('cors');

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.send('Testing. Hello world.');
});

server.listen(port, () => {
	console.log(`\n=== Listening on port ${ port } ===`)
});
