const express = require('express');


module.exports = server =>{
    server.use(express.json());
    server.use(upper);
}

