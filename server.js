const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 8000

server.use(bodyParser());

const users = [

{
    "id": 0,
    "name": "Hop-Along"
},

{
        "id": 1,
     "name": "Jesse James"
},

{
"id": 2,
  "name": "Sundance"
},

{
     "id": 3,
   "name": "Doc Holliday"
}

];

let userId = 4;

/*server.get('/', (req, res) => {
   res.send('Hello!');
});*/

server.post('/users', (req, res) => {
  users.push({
    id: userId++,
    name: req.body.name
  });
});

server.get('/users' , (req, res) => {
  res.json(users);
});

server.get('/users/:id', (req, res) => {
    res.json(users.filter(user => user.id.toString() === req.params.id));
  });

  server.get('/search' , (req, res) => {
    res.json(users.filter(user => req.query.name.toLowerCase() === user.name.toLocaleLowerCase.toLowerCase()));
  });

  server.delete('/users/:id', (req, res) => {
    res.json(users.filter(user => user.id.toString() !== req.params.id));
  });


server.listen(PORT, err => {
  if (err){
      console.log(`You Dun Goofed!: ${err}`)
  } else {
      console.log(`Server listening on port ${PORT}`);
  }
});
