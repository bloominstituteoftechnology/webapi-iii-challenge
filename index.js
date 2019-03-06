// code away!
const server = require('./server');

const PORT = 9090;

server.listen(PORT, () => {
    console.log(`server running on port number ${PORT}...`)
});
