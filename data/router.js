const express = require('express');

const router = express.Router();

const userDb = require('./helpers/userDb');
const postDb = require('./helpers/postDb');

//** Middleware **//
const makeCaps = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
};

//** User Routes **//

//get all
router.get('/users', (req,res) => {
    userDb
    .get()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(500).json({error: "user not found"}));
});

//get by id
router.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    userDb
    .get(userId)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.status(200).send(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'user could not be populated'})
    });
});

//post
router.post('/users', makeCaps, (req,res) => {
    const userInfo = req.body;
    console.log("userInfo", userInfo);
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
            res.status(400).json({msg: 'please provide all required fields'})
        } else {
            res.status(500).json({error: err});
        }
    });
});

// /router.put('/users/:userId',   function(req, res) {
//     const id = req.params.userId;
//     const update = req.body;
//     userDb
//     .update(id, update)
//     .then(count => {
//         if (count > 0) {
//             userDb.get(id).then(users => {
//                 res.status(200).json(users[0]);
//             })
//         } else {
//             res.status(404).json({msg: 'user not found'});
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// })

//delete
router.delete('/users/:userId', function(req, res){
    const id = req.params.userId;
    userDb
    .get(id)
    .then(user => {
        userDb.remove(id)
        .then(response => {
            res.status(200).json(user);
        })
    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});


//** Post Routes **//

//get all
router.get('/posts', (req,res) => {
    postDb
    .get()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => res.status(500).json({error: "posts not found"}));
});

//get by id
router.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    postDb
    .get(postId)
    .then(post => {
        if(!post) {
            res.status(404).json({message: 'post not found'});
        } else {
            res.status(200).send(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'post could not be populated'})
    });
});

//get posts by user id
router.get('/users/:userId/posts/', (req, res) => {
    const userId = req.params.userId;
    userDb
    .getUserPosts(userId)
    .then(post => {
        if(!post) {
            res.status(404).json({message: 'no posts not found for this user'});
        } else {
            res.status(200).send(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'posts could not be populated'})
    });
});


//post --- not working
router.post('/posts/', (req,res) => {
    const {text, userId} = req.body;
    const newPost = {userId, text};

    if (!text || !userId) {
        return res.status(400).json({msg: 'please provide all required fields'});
    }
    postDb
    .insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({error: "Error saving post"});
    });
});

//put

//delete
// router.delete('/api/posts/:postId', (req, res) => {
//     const postId = req.params.postId;

//     postDb
//     .get(postId)
//     .then(post => {
//         postDb
//         .remove(postId)
//         .then(post => {
//             res.status(200).json({message: "post deleted"})
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         }); 
//     })
//     .catch(err => {
//         res.status(404).json({message: 'post not found'});
//     }); 
// });

router.delete('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    postDb
    .remove(postId)
    .then(post => {
        res.status(200).json({message: "post deleted"})
    })
    .catch(err => {
        res.status(500).json(err)
    });  
});

module.exports = router;