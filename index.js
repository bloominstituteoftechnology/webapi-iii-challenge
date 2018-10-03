const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 5000;

server.use(logger('tiny'), cors(), helmet());

server.listen(port, () => {
    console.log(`API running on ${port}`);
});