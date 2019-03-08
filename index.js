// code away!
require('dotenv').config();
const server = require('./server.js');
PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Our server is listening on port ${PORT}`);
});