const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRouter = require("./users/usersRouter");
const postsRouter = require('./posts/postsRouter');
const tagsRouter = require('./tags/tagsRouter');

const server = express();

// MIDDLEWARE 

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/users", usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/tags', tagsRouter);

server.get("/", (req, res) => {
	res.send({ api: "Running..." });
});

const port = 5000;
server.listen(port, () => console.log("API Running..."));
