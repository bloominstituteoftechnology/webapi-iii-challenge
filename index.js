const express = require("express");
const uppercaseMW = require("./uppercaseMW");
const userDB = require("./data/helpers/userDb");

const server = express();
server.use(express.json());
server.use(uppercaseMW.uppercase);

server.get("/users", async (req, res) => {
  try {
    const results = await userDB.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/users/:userID", async (req, res) => {
  if(!Number(req.params.userID)){
    res.status(400).json({errorMessage: "ID not a number"});
  }
  try {
    const results = await userDB.get(Number(req.params.userID));
    if(results){
      res.status(200).json(results);

    }
    res.status(500).json({errorMessage: "Invalid ID"});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

server.listen(9001, () => console.log("API running on port 9001"));
