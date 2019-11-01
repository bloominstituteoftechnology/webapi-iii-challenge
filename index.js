// code away!

require('dotenv').config();

const express = require('express');
const server = require('./server.js')

const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log(`\n**** Server runs on http://localhost:${port} ***\n`)
});

