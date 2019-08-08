const server = require('./server');

const port = 8000;
server.listen(port, () =>
  console.log(`\n listening on port http://localhost:${port} \n`),
);
