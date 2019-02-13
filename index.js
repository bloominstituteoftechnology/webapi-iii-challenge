// code away!
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
const server = express();


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));



server.use('/api/posts', restricted('matt'), postRouter)
server.use('/api/users', restricted('matt'), userRouter)

// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from Node Blog')
});
//Authentication
function restricted(name) {
    return function(req, res, next) {
      const personName = req.headers.name;
    console.log(personName)
      if (personName === name) {
        next();
      } else {
        res
          .status(401)
          .json({ message: 'Please login to access this information' });
      }
    };
  }


  

server.listen(8000, () => console.log('API running on port 8000'));