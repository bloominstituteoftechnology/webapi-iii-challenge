const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const posts = require("./data/helpers/postDb");
const users = require("./data/helpers/userDb");
const port = 9000




//middleware

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({}));

//custom middleware

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

//endpoints

server.get("/api/users", (req, res) => {
    users
      .get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ message: "the post info could not be received" });
      });
  });



server.listen(port, () => console.log(`Server listening on ${port}`));