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

// server.use((err, req, res, next) => {
//   // save the error to the database
//   // send an email to the responsible party
//
//   switch (err.code) {
//     case 400:
//
//     case 11345:
//       res.status(403).send({
//         success: false,
//         data: undefined,
//         title: err.message,
//         description: '',
//         recovery: 'Please require access to this resource',
//       });
//     case 404:
//
//     default:
//       res.status(500).send({
//         success: false,
//         data: undefined,
//         error: err.message,
//         recovery: '',
//       });
//   }
// });

server.listen(8000, () => console.log('\n=== API running on port 8000 ===\n'));
