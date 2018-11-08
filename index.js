// pull in server from api directory
const server = require('./api/server.js');

// turn on server
const port = 9000;
server.listen(port, () => console.log(`\n---Listening on port ${port}---\n`));