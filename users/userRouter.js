const router = require('express').Router();

const db = require("./userDb");
const Posts = require("../posts/postDb")

// Add a new user
router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ error: "Failed to add new user to database." }))
});

// Add a new post to a user
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    Posts.insert({
        text: req.body.text,
        user_id: req.user
    })
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ error: "Failed to add new post to database." }))
});

// Get all users
router.get('/', (req, res) => {
    db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "Failed to retrieve all users." }))
});

// Get a specific user by ID
router.get('/:id', validateUserId, (req, res) => {
    db.getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: `Failed to find user with an ID of ${id}.` }))
});

// Get a users posts
router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;

    db.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: `Failed to retrieve posts from user with an ID of ${id}.` }))
});

// Remove user by ID
router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({ error: `Failed to remove user with ID of ${id}.` }))
});

// Edit user by ID
router.put('/:id', validateUserId, validateUser, (req, res) => {
    const id = req.params.id;
    const updatedInfo = req.body;

    db.update(id, updatedInfo)
    .then(updated => {
        db.getById(id)
        .then(user => res.status(200).json(user))
    })
    .catch(err => res.status(500).json({ error: `Failed to update user with ID of ${id}.` }))
});

//custom middleware
function validateUserId(req, res, next) {
    const id = req.params.id;
    
    db.getById(id)
    .then(user => {
        if (user){
            req.user = id;
            next();
        } else res.status(400).json({ errorMessage: "Invalid user id." })
    })
    .catch(err => res.status(500).json({ error: `Failed to retrieve user with an ID of ${id}.` }))
};

function validateUser(req, res, next) {
    const newUser = req.body;

    if (!Object.getOwnPropertyNames(req.body).length) {
        res.status(400).json({ errorMessage: "Missing user data." })
    } else if (!newUser.name) {
        res.status(400).json({ errorMessage: "Missing required name field." })
    } else next();    
};

function validatePost(req, res, next) {
    const newPost = req.body;

    if (!Object.getOwnPropertyNames(req.body).length) {
        res.status(400).json({ errorMessage: "Missing post data." })
    } else if (!newPost.text) {
        res.status(400).json({ errorMessage: "Missing required text field." })
    } else next();
};


module.exports = router;
