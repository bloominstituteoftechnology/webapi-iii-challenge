const express = require('express'); // used for the server 
const logger = require('morgan'); // 
const cors = require('cors'); // used to connect to react

const helmet = require('helmet'); // security measure 
// const sqlite3 = require('sqlite3'); // 
// const knex = require('knex'); // 

const db = require('./data/helpers/userDb'); // this is the DataBase

const server = express();
server.use(helmet());
server.use(express.json());


const yell = (req,res,next) => {
req.body.name = req.body.name.toUpperCase();
next();
};
// the GET section
server.get('/', (req,res)=>{
    res.send('Go To /users')
});
// this is where we will see the array of obj.
server.get('/users',(req,res)=>{
db.get()
    .then(users =>{
    res.status(200).json(users);
    })
    .catch(error => res.status(500).json({error:'Internal Server Error.'}))
});

server.get('/users/:id', (req,res)=> {
db.getUserPosts(req.params.id)
    .then(user => {
    res.status(200).json(users);
})
    .catch(error => res.status(500).json({error:'Internal Server Error.'}));
});
// the POST section
server.post('/users', yell, (req,res)=> {
    const {name} = req.body;
    const newUser = {name};
    if(!name) {
        return res.status(400).json({error:"Bad Request, No name sent."});
    }
    db.insert(newUser)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => res.status(500).json({error:'Internal Server Error.'}));
});
// the DELETE section 
server.delete('/users/:id',(req,res) => {
    const {id} = req.params;
    db.remove(id)
    .then(deleteUser => {
        if(deleteUser) {
            res.status(200).json({message:'Ok.'});
        } else {
            res.status(404).json({error:`Id: ${id} Not Found.`});
        }
    })
    .catch(error => {
        res.status(500).json({error:'Internal Server Error.'});
    });
});
// the EDIT section
// params
// body
// 
server.put("/users/:id", yell, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = { name };
    db.update(id, updatedUser)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ error: `Id: ${id} Not Found.` });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "Internal Server Error." });
      });
  });

  // getting the sever working 
  const port = 9000; // the port number
    server.listen(port, () => 
    console.log(`\n== API running on http://localhost:${port} ==\n`)
);

// types of middleware
/* 
- built in 
- third party
- custom
- error handling middle (err, req, res, next) => {}

homeies
- dou > trio > quartet

Application Mode
- error mode
- regular mode

R = regular
E = error
[Rm1] =next(new Error(something))> [Rm2] =next()> [Em1] =next()> [Em2] => [Rm3] 

calling next() moves to the next regular middleware.
calling next(argument) moves to the next error handling middleware.


 */


// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');
// const port = 9000;
// const helmet = require('helmet');

// const server = express();



// const greeter = (req, res, next) => {
//   req.section = 'FSW-13';
//   next();
// };

// const yell = (req, res, next) => {
//   console.log(req.params)

//   req.name = req.params.name.toUpperCase();

//   next();
// };

// server.use(logger('tiny'), cors(), helmet());

// server.get('/name/:name', yell, greeter, (req, res) => {
//   res.send(`${req.name} is in ${req.section}`);
// });

// server.get('/section', greeter, (req, res) => {
//   res.send(`Hello ${req.section}, I <3 U!`);
// });


// server.get('/', (req, res) => {
//   res.send('Cowabunga!');
// });

// server.get('/rapha', (req, res) => {
//   res.send('I am Raphael');
// });

// server.listen(port, () => {
//   console.log(`Booyahkasha happening on ${port}`);
// });