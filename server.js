
const express = require('express');
const server = express();
 server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog');
} );
 server.listen(8000, () => console.log('/n== API on port 8000 ==/n') )