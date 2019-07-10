const express = require("express");
const app = express();
const posts = require("./posts/postRouter");
const users = require("./users/userRouter");

app.use("/api/users", users);
app.use("/api/posts", posts);

let server = app.listen(3000);
