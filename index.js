// code away!
require('dotenv').config()

const server = require('./server')

//Custom Middleware -- BOTTOM LEVEL -- 
const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`magic happening on ${port}`)
})