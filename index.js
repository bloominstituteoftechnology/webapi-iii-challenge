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

//middleware users below
function upperCase(req, res, next) {
  let name = req.body.name
  const newName = name
    .split(" ")
    .map(name => name[0].toUpperCase() + name.slice(1, name.length))
    .join(" ");
  req.upperName = newName;
  next();
}



//middleware posts below

function doesUserExist (req, res, next) {
  console.log(req.body, "body")
  db.get()
    .then( users => {
      let user = users.filter(usr => usr.id === req.body.userId)
      req.user = user.length ? user[0] : []
      req.users = users // this can be used to get items for get
      //once I make this a global on the posts in single file
      //designed for posts. 
      //console.log(req.user,"|user >> users", req.users)
      next()
    }).catch( error => {
      res.status(500).json({error, message: "unable to get users to perform check"})
    })
}//This is going to be local on the post only
//later it can be used globally on the posts.
//only the userId will not matter in case of removing a post. 

//middleware posts above 

server.get("/api/users", (req, res) => {
  db.get()
    .then(users => {
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
        db.getUserPosts(user.id)
          .then(posts => {
            res.status(200).json({id: user.id, name: user.name, posts})
          })
          .catch(error => {
            res.status(500).json({error, message: "Problem getting posts"})
          })
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
  db.remove(id)
    .then(user => {
      if (user) {
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
      res.status(200).json(posts)
    }).catch( error => {
        res.status(500).json({error, message: "Check the url path unable to get posts. Do they exist?"})
    })
})
server.post("/api/posts", doesUserExist, (req,res) => {
  if(req.body.userId && req.body.text){
    postDb.insert(req.body)
    .then(post => {
      if(req.user.id){
        res.status(201).json(req.body)
      } else {
        res.status(404).json({message: "user was not found"})
      }
    })
    .catch(error => {
      res.status(500).json({error, message: "Unable to save post"})
    })
  } else {
    res.status(500).json({message: "userId and text required and were missing"})
  }
})

server.put('/api/posts/:id', doesUserExist, (req, res) =>{
  const {id, text, userId} = req.body 
  if(text.length){
    postDb.update(id,{text,userId})
    .then(count => {
      if(count){
        res.status(200).json(req.body)
      } else {
        res.status(500).json({message: "unable to update"})
      }
    }).catch(error => {
      res.status(500).json({error, message:"Not sure what happened recheck inputs and paths"})
    })
  } else {
    res.status(404).json({message: "The information as probided is not valid check that there is content in the text section"})
  } 
})

server.delete('/api/posts/:id', (req,res) => {
  const {id} = req.params
  postDb.remove(id)
    .then(deleted => {
      if(deleted){
        res.status(204).end()
      } else {
        res.status(500).json({message: "unable to delete"})
      }
    }).catch(error => {
      res.status(500).json({error, message: "Unable to delete item check path"})
    })
})

server.listen(PORT, () => console.log(`\n== API on port ${PORT}==\n`));
