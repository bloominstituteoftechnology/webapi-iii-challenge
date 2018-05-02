//import all dependency's here:
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const port = 5000;

// create custom middleware here:


// apply middleware here:
server.use(helmet());
server.use(cors());
server.use(express.json());

// create route handlers here:
server.get('/', (req, res) => {
  res.json({message: 'welcome!'});
})
server.listen(port, () => {
  console.dir(`server listening on port ${port}`);
})
