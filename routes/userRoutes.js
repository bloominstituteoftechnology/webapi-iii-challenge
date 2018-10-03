const express = require('express');
const dbUsers = require("../data/helpers/userDb");
const router = express.Router();

router.use(express.json());

//MIDDLEWARE
function upperCase(req, res, next) {
    req.upperName = req.body.name.toUpperCase();
    next();
};

//USERS
router.get("/", async (req, res) => {
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

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
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

router.get("/:userId/posts/:postId", async (req, res) => {
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

router.post("/", upperCase, async (req, res) => {
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

router.put("/:userId", upperCase, async (req, res) => {
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

router.delete("/:userId", async (req, res) => {
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

module.exports = router;
