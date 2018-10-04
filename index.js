const express = require('express'); // used for the server 
const logger = require('morgan'); // 
// const cors = require('cors'); // used to connect to react

const helmet = require('helmet'); // security measure 


const server = express();
server.use(helmet());
server.use(express.json());


// const yell = (req,res,next) => {
// req.body.name = req.body.name.toUpperCase();
// next();
// };

// the GET section
server.get('/', (req,res)=>{
    res.send('welcome home, Go To /users')
});

server.use('API/users', userRoutes);
server.use('API/posts', postRoutes);

  // getting the sever working 
  const port = 9000; // the port number
    server.listen(port, () => 
    console.log(`\n== API running on http://localhost:${port} ==\n`)
);

