const express = require ('express');

const User = require (`./userDb`);
const Post = require (`../posts/postDb`);

const router = express.Router();



router.post('/', validateUser, (req, res) => {
res.status(201).json(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
 Post.insert(req.body)
 .then(post => {
     res.status(201).json(post);
 })
 .catch(err => {
     res.status(500).json({message: `There was an error while creating the new post`});
 })
});

router.get('/', (req, res) => {
User.get ()
.then(users => {
    res.status(200).json(users);
})
.catch(err => {
    res.status(500).json({ message: `there was an error trying to get the users from the database`});
});
});

router.get('/:id', validateUserId,(req, res) => {
const {id } = req.params;

User.getUserPosts(id)
.then(posts => {
    res.status(200).json(posts);
})
.catch(err => {
    res.status(500).json({ message: 'There was a problem getting the users posts' });
});


});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    User.remove(id)
    .then(num => {
        if(num > 0) {
            res.status(200).json(req.user); // return the user who was deleted
        } else {
            res.status(404).json({ message: 'user not found' });
        };
    })
    .catch(err => {
        res.status(500).json({ message: 'There was a problem deleting the user from the database' });
    });
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;

    User.update(id, req.body)
    .then(num => {
        res.status(200).json({ message: 'User updated successfully!' });
    })
    .catch(err => {
        if(!req.body.name) {
            res.status(400).json({ message: 'The required name field does not exist' });
        } else {
            res.status(500).json({ message: 'There was an error updating the user' });
        };
    });
});

//custom middleware

function validateUserId(req, res, next) {
User.insert(req.body)
.then(user => {
    req.user = user;
    next();
})
.catch(err => {
    if (Object.entries(req.body).length === 0) {
        res.status(400).json({ message: `missing user data`});
    } else if (!req.body.name) {
        res.status(400).json({message: `missing required name field`});
    } else {
        res.status(500).json({ message: `there was a problem adding the user to the datebase `});
    };
});





const [id] = req.params;
User.getById(id)
.then(user => {
    if(user) {
        req.user = user;
        next();
    }else {
        res.status (400).json({message: `invalid user id`});
    };
})
.catch(err => {
    res.status(500).json({ message: `couldnt retrieve user`});
});
};

function validateUser(req, res, next) {
    const {name} = req.body;
    if(Object.entries(req.body).length === 0 ) {
        res.status(400).json({ message: `Whoops! Missing userdata!`});
    } else if (!name) {
        res.status(400).json({ message: `Missing require name field`});
    } else {
        User.insert(req.body)
        .then(user => {
            req.user = user;
        next();
    })
    .catch (err => {
        res.status(500).json({ message: `There seems to be a problem adding the user to the database`});
    });
    };
};

function validatePost(req, res, next) {
 const { text } = req.body;
 if (Object.entries(req.body).length === 0) {
     res.status(400).json ({ message: `missing post data`});
 } else {
     Post.insert(req.body)
     .then(post => {
         req.post = post;
         next();
     })
     .catch(err => {
         res.status(500).json({ message: `There was a problem adding the post to the database`});
     });
 };
};

module.exports = router;
