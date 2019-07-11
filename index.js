const dotenv = require('dotenv');
dotenv.config();

const server = require('./server.js');
const port = process.env.port

server.listen(port, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`);
});