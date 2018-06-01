const server = require('express')();
const port = 5000;
const routes = require('./routes');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE']
};

server.use(cors(corsOptions));
server.use('/', routes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})