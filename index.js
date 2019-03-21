// code away!
require('dotenv').config()

const server = require('./server.js')

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'http://localhost:'

server.listen(port, () => {
    console.log(`Server Is Listening at ${ host ? host : host + port}`)
})