const express = require("express");
const getPost = require("./data/helpers/postDb.js");
const getUser = require("./data/helpers/userDb.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("kickin ass");
});

server.get("/api/posts", (req, res) => {
  getPost
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json({ message: "Server Error" });
    });
});

server.get("/api/users", (req, res) => {
  userPost
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Server Error" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  getPost
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json({ message: "Post not found" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  getUser
    .get(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json({ message: "User not found" });
    });
});

server.post('/api/posts/', (req, res) => {
  const postInfo = req.body;
if (req.body.userId.length > 0 && req.body.text.length > 0)
  {getPost.insert(postInfo).then(result => {
      res.status(201).json(result)}
)}
    else(res.status(400).json({message:' wrong dumm dumm'}))
  .catch(err =>{
      res.status(500).json({message:'something'})
  })
});


server.post('/api/users',(req, res) => {
    const { name } = req.body
    if (name.length > 0 && name.length < 127){
    getUser.insert({ name })
        .then(result => {
            res.status(201).json(result)}
        )}
    else(res.status(404).json({message:'please add a username'}))
        .catch((err) => {
            res.status(500).json({message: 'It\s broken'})
        })
});


server.put('/api/post', (req, res) => {


})

server.listen(5000, () => console.log("up and at em!"));





