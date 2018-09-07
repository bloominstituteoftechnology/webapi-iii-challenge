const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js');
const userRouter = require('/data/userRoutes');

const toUppercase = (req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        const name = req.body.name.toUpperCase();
        req.body.name = name;
    }
    next();
}

server.use(express.json());
server.use('/user', userRoutes)
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

const port = 8000;

server.use(toUppercase);

server.get("/api/users", (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({ error: "Error retrieving data" })
    })
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    userDb.get(id).then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: "user does not exist" })
        }
    }).catch(err => {
        res.status(500).status.json({ error: "User could not be retrieved" })
    })
});

server.post("/api/users", (req, res) => {
    const data = req.body
    if (data.name) {
        userDb.insert(data).then(userId => {
            userDb.get(userId.id).then(user => {
                res.status(201).json(user)
            }).catch(err => {
                res.status(500).json({ error: "Error accessing this user" })
            })
        }).catch(err => {
            res.status(500).json({ error: "Error updating info in database" })
        })
    } else { res.status(400).json({ error: "User name must be provided" }) }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    userDb.remove(id).then(count => {
        if (count > 0) {
            res.status(200).json({ message: "User has been deleted" })
        }
    }).catch(err => {
        res.status(500).json({ error: "Error deleting user" })
    })
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    if (updatedData.name) {
        userDb.update(id, updatedData).then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Information has been updated" })
            } else {
                res.status(404).json({ error: "User does not exist" })
            }
        }).catch(err => {
            res.status(500).json({ error: "Error updating info to database" })
        })
    } else {
        res.status(400).json({ message: "User name must be provided" })
    }
})

server.listen(port); 