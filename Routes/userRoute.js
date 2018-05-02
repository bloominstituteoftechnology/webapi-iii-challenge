import express from 'express';
import db from '../data/helpers/userDb';

// /users
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
  const response = await db.get();
  res.json(response);
});

export default userRoute;
