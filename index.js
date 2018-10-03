const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({"message": "I AM ROOT!"});
});


const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
