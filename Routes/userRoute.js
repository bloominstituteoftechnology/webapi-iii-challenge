import express from 'express';
import db from '../data/helpers/userDb';

// /users
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
  const response = await db.get();
  res.json(response);
});

userRoute.get('/:id', async (req, res) => {
  const response = await db.get(req.params.id);
  console.log(response);
  if (response.length > 0) {
    res.status(404).json({msg: 'User not found'});
    return;
  } 
  res.json(response[0]);
});

userRoute.post('/', async (req, res) => {
  const userInformation = await db.insert(req.body);
  console.log(userInformation);
  res.json(userInformation);
});

userRoute.put('/:id', async (req, res) => {
  const userInformation = await db.update(req.params.id, req.body);
  console.log(userInformation);
  res.json(userInformation);
});

userRoute.delete('/:id', async (req, res) => {
  const userInformation = await db.remove(req.params.id);
  console.log(userInformation);
  res.json(userInformation);
})

export default userRoute;
