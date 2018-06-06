const express = require('express');
const cors = require('cors');

//need db here

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

//end point here

server.listen(port, () => console.log(`Server is running on port ${port}`));