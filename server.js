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







// server.post('/users', (req, res) => {
//     const {user} = req.body;
//     const {id} = req.params;
    
//     users.insert(user)
//         .then((user)=> {
//             const id = user.id;

//             users.insert(id)
//                 .then((user) => {
//                     res.status(201).json(user);
//                 })
//                 .catch((fail) => {
//                     console.log(fail);
//                     res.status(500).json({ error: "There was an error while saving the post to the database." });
//                 });
//         })
//         .catch((fail) => {
//             console.log(fail);
//             res.status(500).json({ error: "Catch Fail: There was an error while saving the post to the database." });
//         });
// });





server.delete('/users/:id', (req, res) => {
    const {id} = req.params;

        users.getUserPosts(id)
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((fail) => {
                console.log(fail);
                res.status(404).json({ message: "The post with the specified ID does not exist."});
            });

    users.remove(id)
        .then((user) => {
            response.json(user);
        })
        .catch((fail) => {
            console.log(fail);
            response.status(500).json({
                error: "The post could not be removed"
            });
        })
});


server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;

        posts.getPostTags(id)
            .then((post) => {
                res.status(201).json(post);
            })
            .catch((fail) => {
                console.log(fail);
                res.status(404).json({ message: "The post with the specified ID does not exist."});
            });

    posts.remove(id)
        .then((post) => {
            response.json(post);
        })
        .catch((fail) => {
            console.log(fail);
            response.status(500).json({
                error: "The post could not be removed"
            });
        })
});











server.listen(8000, () => console.log('\n== API on port 8k ==\n'));