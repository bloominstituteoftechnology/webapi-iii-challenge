require('dotenv').config();

// import server
const server = require('./server.js');


// a hosting service might assign a port dynamically
// Environment Variable are system wide
const port = process.env.PORT || 6000;
// watch for connections on port 6000 or whatever the environmentals assign
server.listen(port, () => {
    console.log( `\n\n***** Server Running on http://localhost:${port} *****\n\n` );
});