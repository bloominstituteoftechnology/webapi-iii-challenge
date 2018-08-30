const express = require('express');
const dbPosts = require("../data/helpers/postDb.js");
const router = express.Router();

router.use(express.json());

//POSTS
router.get("/", async (req, res) => {
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

router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
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

router.get("/:postId/tags", async (req, res) => {
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

router.post("/", async (req, res) => {
    const { userId } = req.params;
    const post = req.body;
    if (!post.text) {
        res.status(400).json({
            message: "Cannot be blank. Please enter some text."
        })
    } 
    else if(!userId) {
        res.status(400).json({
            message: "There is no such user ID in the database."
        })
    } 
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

router.put("/:postId", async (req, res) => {
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

router.delete("/:postId", async (req, res) => {
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

module.exports = router;