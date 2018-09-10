const express = require('express');
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');


const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello');
});



server.get('/users', (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    })
    .catch(fail => {
        console.log('fail', fail)
        res.status(500).json({message: 'Error getting the data'});
    });
})


server.get('/posts', (req, res) => {
    posts.get().then(users => {
        res.status(200).json(users);
    })
    .catch(fail => {
        console.log('fail', fail)
        res.status(500).json({message: 'Error getting the data'});
    });
})



// server.delete('/api/posts/:id', (req, res) => {
//     const {id} = req.params;

//         db.findById(id)
//             .then((post) => {
//                 res.status(201).json(post);
//             })
//             .catch((fail) => {
//                 console.log(fail);
//                 res.status(404).json({ message: "The post with the specified ID does not exist."});
//             });
  
//     db.remove(id)
//         .then((posts) => {
//             response.json(posts);
//         })
//         .catch((fail) => {
//             console.log(fail);
//             response.status(500).json({
//                 error: "The post could not be removed"
//             });
//         })
// });












server.listen(8000, () => console.log('\n== API on port 8k ==\n'));