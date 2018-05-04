import express from "express";
import PostController from "../Controllers/PostController";

const PostRouter = express.Router();
const { getPost, getPostTags, createPost, updatePost, removePos } = PostController;

PostRouter.get("/:id", getPost);
PostRouter.get("/:id/tags", getPostTags);
PostRouter.post("/", createPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", removePost);

export default PostRouter;