const express = require('express');
const db = require('./data/postDb.js');
const db = require('./data/tagDb.js');
const db = require('./data/userDb.js');

// add your server code starting here
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
  //res.end
  // try{
  //   const users = await db.find();
  //   res.status(200).json(users);
  // }catch(err){res.status(500)
  //.json({error:"we have error"})

  // }
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The posts information could not be retrieved." })
    })



});


server.listen(6000, () => console.log('API running on port 6000'));

  // db.insert()
  // .then(posts=>{
  //   res.status(200).json(posts);
  // })
  // .catch(error =>{
  //   res.status(500)
  //   .json({error:"we have error"})
