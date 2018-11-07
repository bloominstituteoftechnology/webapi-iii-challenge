

//==============================================================================

//-- Constants -----------------------------------
const PORT = 8080;
const SERVER_START_MESSAGE = `API Server started on port ${PORT}`;

//-- Dependencies --------------------------------
const express = require('express');

//-- Server Configuration & Middleware -----------
const server = express();
server.use(express.json());
server.listen(PORT, () => console.log(SERVER_START_MESSAGE));

//-- Routing & Subcomponents ---------------------
server.use('/users', require('./routes/users.js'));
server.use('/posts', require('./routes/posts.js'));
