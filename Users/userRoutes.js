import express from 'express';
import UserController from '../Controllers/UserControllers';

const UserRouter = express.Router();
const { getUser, getUserPosts, createUser, updateUser, removeUser } = UseController;

UserRouter.get('/:id', getUser);
UserRouter.get('/posts/:id', getUserPosts);
UserRouter.post('/', createUser);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', removeUser);

export default UserRouter;