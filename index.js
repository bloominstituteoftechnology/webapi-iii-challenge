// import server
const server = require('./server.js');



// watch for connections on port 6000
server.listen(6000, () => {
    console.log( '\n\n***** Server Running on http://localhost:5000 *****\n\n' );
});