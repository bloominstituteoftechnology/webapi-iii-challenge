const express = require('express');
const uppercaseMW =require ("./uppercaseMW");


const server = express();
server.use(express.json());
server.use(uppercaseMW.uppercase)

server.use('/', (req, res) => res.send(req.body));


server.listen(9001, () => console.log('API running on port 9001'));