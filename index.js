// code away!
const server = require('./server.js')
const port = 4000;

server.listen(port, () => {
    console.log(`Server Is Listening at http://localhost:${port}`)
})