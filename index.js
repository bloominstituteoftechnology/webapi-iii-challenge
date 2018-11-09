const server = require('./data/server.js');

const port = 9000;
server.listen(port, () => console.log(`Running on port ${port}`));
