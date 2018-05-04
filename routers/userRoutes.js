import express from 'express';
import UserController from '../controllers/UserController';

const userRoutes = express.Router();
const { getUsers, getUser, getUserPosts, createUser, updateUser, deleteUser } = UserController;
// 

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.get('/:id/posts', getUserPosts);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;