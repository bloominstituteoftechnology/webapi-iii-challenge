const express = require("express");
const port = 3334;
const server = express();
const cors = require("cors");
const userDB = require("./data/helpers/userDb");
server.use(express.json());
server.use(cors());

function capitalizer(req, res, next) {
  let name = req.body.name;
  req.body.name = name.toUpperCase();
  next();
}

const sendError = (status, errorMessage, res) => {
  res.status(status).json({ error: errorMessage });
};

server.get("/api/users", async (req, res) => {
  try {
    const data = await userDB.get();
    res.json(data);
  } catch (err) {
    sendError(500, "The users information could not be retrieved.", res);
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userDB.get(id);
  if (user) {
    res.json(user);
  } else {
    sendError(404, "No user with that id", res);
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userDB.get(id);
  const count = await userDB.remove(id);
  if (!user) {
    sendError(404, "No user with that id", res);
    return;
  }
  if (!count) {
    sendError(500, "No user deleted", res);
    return;
  }
  res.json({'deleted': user})
});

server.post("/api/users/", capitalizer, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      sendError(400, "must include name", res);
      return;
    }
    const id = await userDB.insert({ name });
    const user = await userDB.get(id.id);
    res.status(200).json(user);
  } catch (err) {
    sendError(500, "server error", res);
  }
});

server.put('/api/users/:id', capitalizer, async (req,res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const count = await userDB.update(id, {name})
        const user = await userDB.get(id)
        if (!count){
            sendError(404, 'no users updated', res)
        }
        res.status(200).json(user)
    }catch(err){
        sendError(500, 'server error', res)
    }
})

server.listen(port, () => console.log(`we hear you ${port}`));
