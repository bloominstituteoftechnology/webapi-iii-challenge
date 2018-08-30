const express = require('express');
const server = express();
const helmet = require('helmet');

//db helpers
const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());

//MIDDLEWARE
function upperCase(req, res, next) {
    req.upperName = req.body.name.toUpperCase();
    next();
};

server.get("/", async (req, res) => {
    res.send("Testing")
});

//USERS
server.get("/users", async (req, res) => {
    try {
        const users = await dbUsers.get();
        res.status(200).json(users)
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve user data."
        })
    }
});

server.get("/users/:userId", async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await dbUsers.get(userId)
        res.status(200).json(user)
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve user with the specific userId."
        })
    };
});

server.get("/users/:userId/posts/:postId", async (req, res) => {
    const {userId, postId} = req.params
    if(userId === postId) {
        try {
            const userPosts = await dbUsers.getUserPosts(userId);
            res.status(200).json(userPosts)
        }
        catch(err) {
            res.status(500).json({
                message: "Post with correlated User ID is not found."
            })
        }
    } else {
        res.status(400).json({
            message: "UserId and PostId do not match. Please check and try again."
        })
    };
});

server.post("/users", upperCase, async (req, res) => {
    const {name} = req.body;
    const upperName = req.upperName;
    if(!name) {
        res.status(400).json({
            message: "Please enter a name."
        });
    } else if(name.length > 128) {
        res.status(406).json({
            message: "Name is too long. Please limit name length to 128 characters or less." 
        });
    } else {
        const createUser = await dbUsers.insert({name: upperName});
        try { 
            res.status(200).json(createUser)
        }
        catch(err) {
            res.status(500).json({
                message: "Failed to create new user."
            })
        }
    };
});

server.put("/users/:userId", upperCase, async (req, res) => {
    const upperName = req.upperName;
    const {userId} = req.params;
    const user = req.body
    req.body.name = upperName;
    try {
        const updateUser = await dbUsers.update(userId, user);
        res.status(200).json(updateUser)
    }
    catch(err) {
        res.status(500).json({
            message: "Updated failed."
        })
    };
});

server.delete("/users/:userId", async (req, res) => {
    try {
        const removeUser = await dbUsers.remove(req.params.userId);
        res.status(200).json({ message: `User deleted.`} )
    }
    catch(err) {
        res.status(500).json({
            message: "Cannot delete user."
        })
    };
});

//POSTS
server.get("/posts", async (req, res) => {
    try {
        const posts = await dbPosts.get();
        res.status(200).json(posts)
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve post data."
        })
    };
});

server.get("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    try {
        const post = await dbPosts.get(postId);
        res.status(200).json(post)
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve post(s) with the specific PostId."
        })
    };
});

server.get("/posts/:postId/tags", async (req, res) => {
    const { postId } = req.params;
    try {
        const tag = await dbPosts.getPostTags(postId);
        res.status(200).json(tag);
    }
   catch(err) {
        res.status(500).json({
            message: "Failed to get this post's tags."
        })
    };
});

server.post("/posts", async (req, res) => {
    console.log(req.params.userId)
    const post = req.body;
    if (!post.text) {
        res.status(400).json({
            message: "Cannot be blank. Please enter some text."
        })
    } else if(!post.userId) {
        res.status(400).json({
            message: "Field required. UserId must be entered."
        })
    } 
    //else if() {
        //need to check if UserId exists
    // } 
    else {
        try {
            const createPost = await dbPosts.insert(post);
            res.status(200).json(createPost);
        }
        catch(err) {
            res.status(500).json({
                message: "Failed to create new post."
            })
        };
    };
});

server.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = req.body;
    try {
        const updatePost = await dbPosts.update(postId, post);
        res.status(200).json(updatePost)
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to update post."
        })
    };
});

server.delete("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    try {
        const removePost = await dbPosts.remove(postId);
        res.status(200).json({
            message: `Post deleted.`
        })
    }
   catch(err) {
        res.status(500).json({
            message: "Failed to delete post."
        });
    };
});

server.listen(9000, () => console.log("===API on port 9000==="));