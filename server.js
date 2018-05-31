const express = require('express');
const db = require('./data/helpers/postDb.js');
const db1 = require('./data/helpers/tagDb.js');
const db2 = require('./data/helpers/userDb.js');
const cors = require('cors');
const port = 5555;
const server = express();

server.use(cors({origin: 'http://localhost:5555'}));
server.use(express.json());

const customLogger = (req, res, next) => {
    
}
server.get('/', (req, res) => {
    res.send('Hello from express');
});

/*********
 * 
Server Requests Below
 * 
 *********/

 //GET
server.get(`/api/users`, (_, res) => {
    db2
    .get()
    .then(res => console.log(res))
    .catch(error => console.log(error))
});


//POST
//  server.post(`api/${users}/:id`, (req, res) => {
//      const
//  });

server.listen(port, () => console.log(`Server is running on port ${port}`));