const express = require('express')
const logger = require 
const PORT = 5050;

server=express();


server.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})