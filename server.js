const express = require('express');

//TODOWhy is this var?
var cors = require('cors') 

const apiRouter = require('./Routers/apiRouter')

const server = express();

server.use(express.json())
server.use(cors())

// Basic req/res test
server.get('/', (req, res) => {
  res.send('Welcome Node-Blog API');
});

//Route all requests with the first segment of /api to the apiRouter
server.use('/api', apiRouter);

server.listen(8000, () => 
  console.log('\n ====== API running on port this 8000 ======= \n'));