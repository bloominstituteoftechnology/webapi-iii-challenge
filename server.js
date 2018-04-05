const express = require ('express');
const helmet = require ('helmet');
const morgan = require ('morgan');
const cors = require ('cors');
const bodyParser = require ('body-parser');

const server = express();
server.get('/' ,( req ,res )=> {
    res.josn ({ api : 'running...'});
} );














const port = 500;
server .listen(port, () => console.log('API RRUNNING ON PORT 5000'));