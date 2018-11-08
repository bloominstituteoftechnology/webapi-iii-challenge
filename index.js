

//== Main Application ==========================================================

//-- Constants -----------------------------------
const PORT = 8080;
const MESSAGE_SERVER_START = `API Server started on port ${PORT}`;

//-- Dependencies --------------------------------
const express = require('express');
const morgan  = require('morgan' );
const cors    = require('cors'   );

//-- Server Configuration & Middleware -----------
const server = express();
server.use(morgan('tiny'));
server.use(cors()        );
server.use(express.json());
server.listen(PORT, () => console.log(MESSAGE_SERVER_START));

//-- Routing & Subcomponents ---------------------
server.use('/users', require('./routes/users.js'));
server.use('/posts', require('./routes/posts'));
