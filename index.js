const express = require('express');
const server = express();
const routes = require('./routes');
const posts = require("./data/helpers/postDb");
const path = require('path');
const middle = require('./middleware');



server.use(express.json());
server.use('/api/users', routes)

server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.get('/download', (req, res, next) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, err => {
      if (err) {
        next(err); 
      } else {
        console.log('File sent successfully');
      }
    });
  });

//   server.use(errorHandler);
//   function errorHandler(err, req, res, next) {
//     console.error(err);
  
//     switch (err.statusCode) {
//       case 404:
//         res.status(404).json({
//           message: 'that file aint herrrrrrre',
//         });
  
//         break;
  
//       default:
//         res.status(500).json({
//           message: 'There was an error performing the required operation',
//         });
//         break;
//     }
//   }
middle(server);

server.listen(7000, ()=> console.log('~API chillin on 7k~'));