const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

const apiRoutes = require('./api/apiRoutes');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api', apiRoutes);

server.listen(8000, () => console.log('\n=== API running on port 8000 ===\n'));
