const express = require("express");
const uppercaseMW = require("./uppercaseMW");
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")


const server = express();

server.use(express.json());
server.use(uppercaseMW.uppercase);

server.use("/users", userRouter )
server.use("/posts", postRouter )

server.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

server.listen(9001, () => console.log("API running on port 9001"));
