const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

const users = {
    1: 'Shobana',
    2: 'Tiffany',
    3: 'Ivan'
};

//middleware receives the request.
server.use((req,res, next) => {
    console.log("Got a request", req);
    next();
});

// get req with id
server.get('/:id/', (req,res )=> {
  if(err) {
    console.log(`Error occured ${err}`);
  } else { 
    if(req.query.name) {
        let user = null;
        Object.keys(users).forEach((id  =>{
            if(users[id] === req.query.name) {
                user = id;
            }
        }));
        res.status(200);
        res.send(user);
    } else {
        res.status(200);
        res.send(users);
    }

  });
}

server.get('/', (req,res) => {
    res.status(200);
    res.send(users);

});

server.listen(PORT, (err) => {
    if(err) {
        console.log(`There was an error ${err}`);
    } else {
        console.log(`Server is listening on PORT number ${PORT}`)
    }
});