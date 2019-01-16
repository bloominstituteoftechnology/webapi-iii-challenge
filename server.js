const express = require('express');

const server = express();

const port = 4000;

server.use('/', (req, res) => res.send(`It's working !!\nIt's working !!`));

server.listen(port, () => console.log(`API running on port: ${port}`));