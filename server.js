const express = require('express');
const server = express();


server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog, and express middleware production');
} );


server.listen(8888, () => console.log('/n== API on port 8888 ==/n') );