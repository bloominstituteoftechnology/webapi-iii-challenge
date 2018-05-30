const express = require('express');
const app = express();
const cors = require('cors');
const userDb = require('./data/helpers/userDb');
const port = 5555;

app.get('/', (req, res) => {
    res.send('Hello there.')
});

app.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(response => {
            res.json(response);
        })
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .get(id)
            .then(response => {
                res.json(response);
            })
});

// app.post('/api/users', (req, res) => {
//     const { name } = req.body;
//         userDb
//             .insert({ name})
//             .then(response => {
//                 res.json(response);
//             })
// });

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .remove(id)
            .then(response => {
                res.json(response);
            })
});

// app.put('/api/users/:id', (req, res) => {
//     const name = req.body.name;
//     console.log("BODY", req.body);
//     const { id } = req.params;
//         userDb
//             .update(id, {name})
//             .then(response => {
//                 res.json(response);
//             })
// });

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});