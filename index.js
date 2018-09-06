const express = require('express');
const server = express();

const userRoutes = require('./users/userRoutes.js')
const postRoutes = require('./posts/postRoutes.js')



server.use(express.json());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);



// server.get('/', (req,res) => {
//     res.send('What is this madness?')
// });








server.listen(2000, () => console.log('\n== API on port 2k ==\n'));