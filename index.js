/*--- import your node modules ---*/
const express = require('express');
const cors = require('cors');

/*--- file imports, constants ---*/
const userRouter = require('./routes/userRoutes');
const port = 5000;

const server = express();

/*--- server middleware ---*/
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);

server.listen(port, () => console.log(`Server listening on port ${port}.`));
