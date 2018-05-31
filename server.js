const server = require('express')();
const port = 5000;
const routes = require('./routes');

server.use('/', routes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})