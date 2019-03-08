// code away!
require('dovenv').config();
const server = require('./server.js');

PORT= propcess.env.PORT || 9090;

server.listen(PORT, () => {
  console.log(`\n* Server Running on PORT ${PORT} *\n`);
});
