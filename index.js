const express = require('express');
const cors = require('cors');

const server = express();


const port = 9000;

//server.listen() method creates a listner on the specified port
//server.listen(port, () => console.log(`API is running on ${port}`));

server.use(express.json());