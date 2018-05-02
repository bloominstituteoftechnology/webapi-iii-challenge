import express from 'express';
import db from '../data/helpers/userDb';
import { validateBody, respondWithError } from '../utils';
import { NOT_FOUND_ERROR, INPUT_ERROR, REMOVE_ERROR, PUT_ERROR } from './Errors';

// post tag
const postTagRoute = express.Router();

postTagRoute.get('/', async (req, res) => {
  try {
    const users = await db.get();
    res.json('get:', users);
  } catch (e) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

postTagRoute.get('/:id', async (req, res) => {
  try {
    const user = await db.get(req.params.id);
    console.log('get:', user);
    if (!user.length) respondWithError(res, NOT_FOUND_ERROR);
    res.json(user);
  } catch (error) {
    respondWithError(res);
  }
});

postTagRoute.post('/', async (req, res) => {
  const userInformation = await db.insert(req.body);
  console.log(userInformation);
  try {
    if (!validateBody(body)) {
      respondWithError(INPUT_ERROR);
      return;
    }
    res.status(201).json(userInformation);
  } catch (error) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

postTagRoute.put('/:id', async (req, res) => {
  try {
    const userInformation = await db.update(req.params.id, req.body);
    console.log(userInformation);
    if (!validateBody(body)) {
      respondWithError(res, INPUT_ERROR);
      return;
    }
    if (Number(response) === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }
    res.json(userInformation);
  } catch (error) {
    respondWithError(res, PUT_ERROR);
  }
});

postTagRoute.delete('/:id', async (req, res) => {
  try {
    const userInformation = await db.remove(req.params.id);
    console.log(userInformation);
    if (response === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }
    res.json(userInformation);
  } catch (error) {
    respondWithError(res, REMOVE_ERROR);
  }
})

export default postTagRoute;