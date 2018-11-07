const express = require("express");
const port = 3334;
const server = express();
const cors = require("cors");
const userDB = require("./data/helpers/userDb");
server.use(express.json());
server.use(cors());

function capitalizer (req, res, next){
  //res.body.name.toUpperCase();
  next();
};
//server.use(capitalizer)

const sendError = (status, errorMessage, res) => {
  res.status(status).json({ error: errorMessage });
};

server.get("/api/users", async (req, res) => {
  try {
    const data = await userDB.get();
    res.json(data);
  } catch (err) {
    sendError(500, "The posts information could not be retrieved.", res);
  }
});



server.listen(port, () => console.log(`we hear you ${port}`));
