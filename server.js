const express = require('express');
var morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postsRoutes');

const mw = require('./middleware');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/users', userRoutes);
server.use('/posts', postRoutes);

server.get('/', (req, res) => {
  res.send('Sup fam');
});

function errorHandler(err, req, res, next) {
  console.log(err);

  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: 'The requested file does not exist.',
      });

      break;

    default:
      res.status(500).json({
        message: 'There was an error performing the required operation',
      });
      break;
  }
}
server.listen(8000, () => console.log('\n== API on port 8k ==\n'));
