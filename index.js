// code away!
require('dotenv').config()

const port = process.env.PORT || 4000;
const greeting = process.env.GREETING

const server = require('./server.js');

server.listen(port, () =>{
    console.log(`\n${greeting} Server running on http://localhost: 4000\n`)
})

//
