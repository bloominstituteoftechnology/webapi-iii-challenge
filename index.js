const server = require('./server/server.js');

const port = 9333;

server.listen(port, () =>
    console.log(`API running on post ${port}`));