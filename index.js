const express = require('express');
const server = express();
server.use(express.json());
const postRoutes = require('./routes/postRoutes.js');
const configureMiddleware = require('./config/middleware.js');

// const cors = require('cors');
// server.use(cors());

//Middlewares
configureMiddleware(server);

const port = 8000;
server.listen(port, ()=>{
    console.log(`API running on port ${port}`);
});

server.get('/', (req, res)=>{
    res.status(200).json('root sucessfully got');
});