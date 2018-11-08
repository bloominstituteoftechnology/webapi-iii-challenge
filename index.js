const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
// MIDDLEWARES

const allCaps = (req, res, next) => {
    console.log(req.body);
  
    Object.assign(req.body, { name: req.body.name.toUpperCase() });
  
    next();
  };


server.use(morgan("dev"), cors(), helmet(), express.json());
   
//=============== USER ENDPOINTS =============== //
server.use('/api/users', userRouter);

//=============== POST ENDPOINTS =============== //
server.use("api/posts", postRouter);


// call server.listen w/ a port of your choosing
server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});