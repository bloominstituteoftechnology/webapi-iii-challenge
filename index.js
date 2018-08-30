const express = require("express");
const db = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js")
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const PORT = 9000;
const server = express();

server.use(express.json());
server.use(helmet()); 
server.use(cors());
server.use(morgan('dev'));

//middleware
function upperCase(req, res, next) {
  let name = req.body.name
  const newName = name
    .split(" ")
    .map(name => name[0].toUpperCase() + name.slice(1, name.length))
    .join(" ");
  req.upperName = newName;
  next();
}

server.get("/api/users", (req, res) => {
  db.get()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `The user with id ${id} was not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.post("/api/users", upperCase, (req, res) => {
  const { name } = req.body;
  const send = { name: req.upperName };
  console.log(send);
  if (name && name.length <= 128) {
    db.insert(send)
      .then(user => {
        res.status(201).json(send);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    res.status(400).json({
      message: "You need a name and it has to be less than 128 characters"
    });
  }
});

server.put("/api/users/:id", upperCase, (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const send = { name: req.upperName };
  if (name && name.length <= 128) {
    db.update(id, send)
      .then(user => {
        if (user) {
          res.status(200).json(send);
        } else {
          res
            .status(404)
            .json({ message: `The user with id ${id} was not found.` });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    res.status(400).json({
      message: "You need a name and it has to be less than 128 characters"
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.remove(id)
    .then(user => {
      if (user) {
        console.log(user);
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: `The user with id ${id} was not found.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.get("/api/posts", (req, res) => {
  postDb.get()
    .then(posts => {
      console.log(posts)
      res.status(200).json(posts)
    }).catch( error => {
        res.status(500).json({error, message: "Check the url path unable to get posts. Do they exist?"})
    })
})

server.post("/api/posts", (req,res) => {
  if(req.body.userId && req.body.text){
    console.log(req.body)
    postDb.insert(req.body)
    .then(post => {
      res.status(201).json(req.body)
    })
    .catch(error => {
      res.status(404).json({error, message: "unable to save the post check userId"})
    })
  } else {
    res.status(500).json({error: "Check that you have a valid userID and contents for your your post"})
  }
})

server.listen(PORT, () => console.log(`\n== API on port ${PORT}==\n`));
