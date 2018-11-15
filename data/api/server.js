//import node mods
const express = require('express');
const server = express();

const configureMiddleware = require('../config/middleware.js')

//middleware
configureMiddleware(server); //server passed as params

//custom middleware here
//global middleware


// configure endpoints (route handlers are middleware!!)
//currently in config/middleware, can be kept here or put in config/routes

module.exports = server;