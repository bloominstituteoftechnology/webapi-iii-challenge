const express = require("express");
const server = express();
const PORT = 4000;

server.use(express.json());

server.listen(PORT, function() {
	console.log(`API server listening on port: ${PORT}`);
});