import express from 'express';

const UserRouter = express.Router();
const { getUser, getUserPosts, createUser, updateUser, removeUser } = UserController;

UserRouter.get('/:id', getUser);