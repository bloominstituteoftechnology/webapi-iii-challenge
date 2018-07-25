const express = require('express'),
    server = express(),
    // Routes
    userRoutes = require('./users/userRoutes'),
    postRoutes = require('./Posts/PostRoutes')
tagRoutes = require('./Tags/TagRoutes')
// middleware
helmet = require('helmet'),
    cors = require('cors'),
    port = 5000;

// applying middleware
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)
server.use('/api/tags', tagRoutes)





server.listen(port, () => console.log(`== Server Running on Port ${port} ==`))