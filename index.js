// Import Express
const express = require('express');


// Import Routes

// User Routes
const userRoutes = ('./routes/userRoutes.js');

// Post Routes
const postRoutes = ('./routes/postRoutes.js');


// Initialize Express
const server = express();


// Middleware
server.use(express.json());


// Use Routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);


// Run Server
server.listen(3000, () => {
    console.log('server running');
});