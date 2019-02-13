const express = require('express');

// Route Imports
const mainRouter = require('./routers');

// Server Creation
const server = express();

// Port Declaration
const port = 4000;

// Routers
server.use('/api', mainRouter);


server.use('/', (req, res) => res.send(`It's working !!\nIt's working !!`));

server.listen(port, () => console.log(`API running on port: ${port}`));