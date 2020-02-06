// code away!
// import server from './api/server';
const server = require('./server.js');

const port = 7000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));
