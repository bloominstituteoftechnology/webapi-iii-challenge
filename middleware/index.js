const server = require('./api/server.js');
const port =9000;

server.listen(port, ()=>console.log(`API running on port ${port}`))