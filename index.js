const express = require("express");
const db = require("./data/helpers/userDb.js");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const postDb = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
//add middleware
// function auth(req, res, next) {
//   req.params.id++;
//   const pass = "pass";
//   if (pass === "pass") {
//     next();
//   } else {
//     res.json({ message: "password incorrect" });
//   }
// }

// note we added the third parameter here: next
// server.get("/download", (req, res, next) => {
//   const filePath = path.join(__dirname, "index.html");
//   res.sendFile(filePath, err => {
//     // if there is an error the callback function will get an error as it's first argument
//     if (err) {
//       // we could handle the error here or pass it down to error-handling middleware like so:
//       next(err); // call the next error-handling middleware in the queue
//     } else {
//       console.log("File sent successfully");
//     }
//   });
// });

function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

// server.use(upperCase);

//add routes
server.get("/users", (req, res) => {
  db.get()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).json({ error: "Users cannot be retrieved" });
    });
});

server.get(
  "/users/:id",
  /*auth,*/ (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "whoops" });
        }
      })
      .catch(err => {
        console.log("error: ", err);
        res.status(500).json({ error: "whoops again" });
      });
  }
);

server.post("/users/posts", async (req, res) => {
  //http message = headers + body(data)
  const post = req.body; //this requies the express.json() middleware

  if (post.title && post.contents) {
    try {
      const response = await db.insert(post);
      res.status(201).json({ message: "User created successfully" });
      //200-299: success, 300-399: redirection, 400-499: client error, 500+: server error
    } catch (err) {
      // handle error
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.put("/users/posts/:id", upperCase, (req, res) => {
  if (req.body.name) {
    users
      .update(req.param.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Need ID" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Not be modified" });
      });
  } else {
    res.status(400).json({ errorMessage: "Please give a name" });
  }
});

server.delete("/users/posts/:id", (req, res) => {
  const { id } = req.params; //const id = req.params.id;

  db.remove(id)
    .then(count => {
      console.log("Count: ", count);
      if (count) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

// server.use(errorHandler);

//start my server up
server.listen(8000, () => console.log("\n=== API on port 8k ===\n"));

// function errorHandler(err, req, res, next) {
//   console.error(err);

//   switch (err.statusCode) {
//     case 404:
//       res
//         .status(404)
//         .json({
//           message: "The requested file does not exist."
//         });
//       break;

//     default:
//       res
//         .status(500)
//         .json({
//           message: "There was an error performing the required operation"
//         });
//       break;
//   }
// }
