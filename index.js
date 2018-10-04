//pull in express
const express = require("express");
//pull in morgan
const logger = require("morgan");
//pull in cors
const cors = require("cors");
//set port number

//import userDB
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");

//instantiate server
const server = express();

server.use(express.json());
/////////////////////MIDDLEWARES/////////////////////////////
const uppercase = (req, res, next) => {
  console.log(req.body.name.toUpperCase());
  req.body.name = req.body.name.toUpperCase();
  next();
};

server.use(logger("tiny"), cors()); // Brock's Way
/////////////////////ROUTES/////////////////////////////////
server.get("/", (req, res) => {
  res.send(`Please work`);
});

//GET ALL USERS
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.send({ err });
    });
});

//GET POST BY USERID
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
  .getUserPosts(id)
    .then(posts => {
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//GET ALL POSTS
server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);
    });
});



//GET ALL POST BY ID
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(posts => {
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//DELETE ALL POSTS WITH THE SAME ID
server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(posts => {
      console.log(posts);
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res
          .status(200)
          .send({ message: "You have deleted the posts for this id" });
      }
    })
    .catch(err =>
      res.status(500).send({
        error: "There was an error while deleting the posts from the database"
      })
    );
});

//ADDING USERS
server.post("/users", uppercase, (req, res) => {
  let { name } = req.body;
  const newPerson = { name };
  userDb
    .insert(newPerson)
    .then(userId => {
      const { id } = userId;
      userDb.get(id).then(user => {
        console.log(user);
        res.status(200).json(req.body);
      });
    })
    .catch(err => {
      if (!name) {
        res.status(404).send({ error: "add a name" });
      } else {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      }
    });
});

//ADD A POST
server.post("/posts", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  postDb
    .insert(newPost)
    .then(post => {
      console.log(post);
      console.log(post.id);
      console.log(post.body);
      console.log(req.body);
      if (!post.id) {
        res
          .status(404)
          .send({ errorMessage: "User with that ID could not be found" });
      } else {
        res.status(201).send({ message: `You added ${req.body.text}` });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

const port = 7040;
//EDIT AN EXISTING POST
server.put("/posts/:id", (req, res)=>{ 
 const {id} = req.params;
  const {text} = req.body;
  const updatedPost = {text}

  postDb
  .update(id, updatedPost)
  .then(posts => {
    console.log("Posts is: " + posts);
    if(!posts){
      res.status(400).send({message: "No user exists that id"})
    } else {
      res.status(200).send({message: "The post has been updated"})
    }
  })
  .catch(err => {
    console.log(`Bohoo you got an ${err}`);
  });
});

//GET USER WITH PARTICULAR ID
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .send({ errorMessage: "There is no user with that name" });
      }
      res.status(201).send(user);
    })
    .catch(err => {
      res.send({ err });
    });
});

//DELETE USER WITH PARTICULAR ID
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("id: " + id);

  userDb
    .remove(id)
    .then(removedName => {
      console.log("Removed name: " + removedName);
      if (!removedName) {
        return res
          .status(404)
          .send({ Error: "The name with the specified ID does not exist." });
      } else {
        res.status(200).send({
          message:
            "you have done the impossible: deleted something off the internet"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ error: "The post could not be removed" });
    });
});

//CHANGE USER INFO FOR PARTICULAR ID
server.put("/users/:id", uppercase, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const nameChanged = { name };

  userDb
    .update(id, nameChanged)
    .then(user => {
      console.log("user is: " + user);
      if (!user) {
        res
          .status(404)
          .send({ message: "There is no name associated with that id" });
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch(err => {
      if (!name) {
        res.status(400).send({
          errorMessage: "please provide a name for value to be updated to"
        });
      } else res.status(500).send({ error: "The post could not be removed" });
    });
});

//call a server.listen on port
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
