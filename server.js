const express = require("express");
const helmet = require("helmet");

const userRoutes = require("./Routes/userRoutes");

const server = express();

// function greeter(name) {
//   return (req, res, next) => {
//     console.log(`hello ${name}`);
//     console.log(req.query);

//     if (req.query.pass === "mellon") {
//       next();
//     } else {
//       res.send(`you shall not pass`);
//     }
//     next();
//   };
// }

// function logger(msg) {
//   return (req, res, next) => {
//     console.log(`\n= ${msg}: ${req.url}`);

//     next();
//   };
// }
// server.use(greeter("yasin"));
// server.use(logger("loading"));
server.use(express.json());
server.use(helmet());

server.use("/api/users", userRoutes);

// function errorHandler(err, req, res, next) {
//   if (err) {
//     res.send(500).json({ error: `sometheing went wrong` });
//   }
// }

// server.use(errorHandler);
server.listen(3333, () => console.log("\n== API running on port 3333 ==\n"));
