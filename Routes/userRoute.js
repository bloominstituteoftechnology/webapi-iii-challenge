import { Router } from 'express';
import db from '../data/helpers/userDb';
import { validateBody, respondWithError } from '../utils';
import {
  NOT_FOUND_ERROR,
  INPUT_ERROR,
  REMOVE_ERROR,
  PUT_ERROR
} from '../Errors';

// /users
const userRoute = Router();

const errorMiddleware = async (err, req, res, next) => {
  console.log('i ran');
  if (err) next(err);
  res.status(400).json({ msg: err });
  // await next();
};

const middWrapper = fn => (err, req, res, next) => fn(err, req, res, next);

const errwrapper = middWrapper(errorMiddleware);

userRoute.get('/', errwrapper, async (req, res) => {
  try {
    const users = await db.get();
    // throw 'err';
    res.status(200).json(users);
  } catch (e) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

userRoute.get('/:id', async (req, res) => {
  try {
    const user = await db.get(req.params.id);
    if (!user.name) respondWithError(res, NOT_FOUND_ERROR);
    res.status(200).json(user);
  } catch (error) {
    respondWithError(res);
  }
});

userRoute.post('/', async (req, res) => {
  const userInformation = await db.insert(req.body);
  try {
    if (!validateBody(userInformation)) {
      respondWithError(res, INPUT_ERROR);
      return;
    }
    res.status(201).json(userInformation);
  } catch (error) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

userRoute.put('/:id', async (req, res) => {
  try {
    const userInformation = await db.update(req.params.id, req.body);
    if (!validateBody(userInformation)) {
      respondWithError(res, INPUT_ERROR);
      return;
    }
    if (Number(userInformation) === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }
    res.status(200).json(userInformation);
  } catch (error) {
    respondWithError(res, PUT_ERROR);
  }
});

userRoute.delete('/:id', async (req, res) => {
  try {
    const userInformation = await db.remove(req.params.id);
    if (userInformation === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }
    res.status(200).json(userInformation);
  } catch (error) {
    respondWithError(res, REMOVE_ERROR);
  }
});

export default userRoute;
