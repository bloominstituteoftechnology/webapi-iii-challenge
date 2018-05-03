const express = require("express");
const helmet = require("helmet");
const server = express();

// middleware
server.use(helmet());
server.use(express.json());

// import sub-applications
const userRoutes = require("./users/userRoutes");
const tagRoutes = require("./tags/tagRoutes");
const postRoutes = require("./posts/postRoutes");

// test
server.get("/", (req, res) => {
	res.send("API running");
});

// user route handlers
server.use("/api/users", userRoutes);
server.use("/api/tags", tagRoutes);

// server at port 5000
server.listen(5000, () => {
	console.log("\n== API Running on port 5000 ==\n");
});
