const express = require("express");
const PORT = 4001;


const server = express();
server.use(express.json());

server.listen(PORT, () => console.log((`API running on port ${PORT}`)))