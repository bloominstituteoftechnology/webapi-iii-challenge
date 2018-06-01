const express = require('express');
const app = express();
const cors = require('cors');
const userDb = require('./data/helpers/userDb');
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");

const port = 5555;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello there.')
});

app.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
        })
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .get(id)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.log(err);
            })
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
        userDb
            .insert({ name})
            .then(response => {
                res.json(response);
            })
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .remove(id)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.log(err);
            })
});

app.put('/api/users/:id', (req, res) => {
    const name = req.body.name;
    console.log("BODY", req.body);
    const { id } = req.params;
        userDb
            .update(id, {name})
            .then(response => {
                res.json(response);
            })
});

app.get("/api/posts", (req, res) => {
    postDb
        .get()
        .then(respose => {
            res.send(respose)
        })
        .catch(err => {
            console.log(err);
        })
});

app.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

app.post("/api/posts/:userId", (req, res) => {
    const { userId } = req.params;
    const { text } = req.body;
    postDb
        .insert({userId, text})
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete("/api/posts/:id", (req, res) => {
    const {id} = req.params;
    postDb
        .remove(id)
        .then(response => {
            if(response == 1) {
                res.send("delete successfully");
            } else {
                res.status(400).send("Bad request")
            }

        })
        .catch(err => {
            res.status(500).json({error: "Something wrong with the server"});
            console.log(err);
        })
})

app.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    postDb
        .update(id, {text})
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/api/tags", (req, res) => {
    tagDb
        .get()
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/api/tags/:id", (req, res) => {
    const { id } = req.params;
    tagDb
        .get(id)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

app.post("/api/tags", (req, res) => {
    const { tag } = req.body;
    tagDb
        .insert({tag})
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
})

// app.delete("/app/tags/:id", (req, res) => {
//     const { id } = req.params;
//     tagDb
//         .remove(id)
//         .then(response => {
//             res.send(response);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// this is a test

// app.put("/api/tags/:id", (req, res) => {
//     const { id } = req.params;
//     const { tag } = req.body;
//     tagDb
//         .insert(id, {tag})
//         .then(response => {
//             res.send(response);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});