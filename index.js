// code away!
require('dotenv').config()

const server = require('./server.js')


const port = process.env.PORT || 4000;
const host = process.env.HOST 

server.listen(port, () => {
    console.log(`Server Is Listening at ${ port !== 4000 ? host : 'http://localhost:' + port}`)
})