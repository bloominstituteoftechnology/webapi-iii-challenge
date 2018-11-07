// NODE MODULES
// ==============================================
const express = require('express');
const cors = require('cors');

// FILE IMPORTS, CONSTANTS
// ==============================================
const userRouter = require('./routes/userRoutes');
const port = process.env.PORT || 5000;

const server = express();

// MIDDLEWARE
// ==============================================
server.use(express.json());
server.use(cors());

// ROUTES
// ==============================================
server.use('/api/users', userRouter);

// START THE SERVER
// ==============================================
server.listen(port, () => console.log(`Server listening on port ${port}.`));
