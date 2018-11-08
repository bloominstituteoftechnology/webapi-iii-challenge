const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDB');
const userDb = require('./data/helpers/userDb');

const port = 8000;
const server = express();
server.use(express.json()); 

const upperCaser = (req, res, next) => {
    const { name } = req.body;
    if (name === name.toUpperCase()) {
        next();
    } else {
        req.body.name = name.toUpperCase();
        next();
    }
}

server.get('/users', (req, res) => {
    userDb
        .get()
        .then(userList => {
            res.status(200).json(userList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.get('/users/:id', (req, res) => {
    const { id } = reqs.params;
    userDb
        .get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});  //404?

server.get('/posts/user/:id', (req, res) => {
    const { id } = req.params;
    userDb  //or postDb?
        .getUsersPosts(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb
        .remove(id)
        .then(deleted => {
            res.status(200).json({ message: "User Deleted"});
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
 });

server.post('users/:id', upperCaser, (req, res) => {
    const { name } = req.body;
    userDb
        .insert({ name })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
 })

//  server.put('/users/:id', upperCaser, (req, res) => {
//      const { id } = req.params;
//      const { name } = req.body;
//      userDb
//         .update({ id, name })
//         .then()
//         .catch(error => {
//             res.status(500).json({ message: "Server Error" });
//         })

//  })



server.get('/posts', (req, res) => {
    postDb
        .get()
        .then(postList => {
            res.status(200).json(postList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.delete('/posts/:id', (req, res) => {
    postDb
        .remove(id)
        .then(response => {
            res.status(200).json({ message: "Post Deleted"});
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.post('/posts', (req, res) => {
    const { id, text } = req.body;
    postDb
        .insert(id, text)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})





server.get('/tags', (req, res) => {
    tagDb
        .get()
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(error => {
            res.status(200).json({ message: "Server Error"});
        })
});

server.listen(port, () => console.log(`Server listening at port ${port}`));