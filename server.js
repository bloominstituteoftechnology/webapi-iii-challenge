const express = require('express');

const server = express();
const users = require('./users/userDb')
// const posts = require('./posts/postDb');
const usersRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')
server.use(express.json());


function logger(req, res, next) {
  console.log(`${req.method} request received`)
    next();
};
server.get('/', logger , atGate,(req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

 
server.use('/users', usersRouter)

server.use('/posts', postsRouter)


//  async function validateUserId(req,res, next){
//   try {
//     const{id} = req.params;
//     const user = await users.findById(id);

//     if(user){
//       req.user = user;
//       next();
//     }else {
//       res.status(404).json({message: 'id not found'})
//     }
//   }catch (error){
//     res.status(500).json(error)
//   }

// }

//custom middleware

// function logger(req, res, next) {
//   console.log(`${req.method} request received`)
//     next();
// };
function atGate(req,res,next){
  console.log('At the gate about to be eaten');

  next();
}
server.use(atGate);

server.get('/test', logger, (req, res)=> {
  console.log('HAY')
  res.send('Welcome traveler')
})

 module.exports = server;
