import express from "express";
import UserRouter from "./Routes/UserRoutes";
// import PostRouter from "./Routes/PostRoutes";
// import TagRouter from "./Routes/TagRoutes";

const server = express();
server.use(express.json());
server.use("/api/users", UserRouter);
// server.use("/api/posts", PostRouter);
// server.use("/api/tags", TagRouter);

const port = 3333;
server.listen(port, () => console.log("\n== API running on port 3333 ==\n"));
