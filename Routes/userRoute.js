// unnecessary
// will make a smaller bundle size
import Router from 'express/lib/router';
import db from '../data/helpers/userDb';
import { asyncMiddWrapper } from '../utils';
import { NOT_FOUND_ERROR, INPUT_ERROR } from '../Errors';

// /users
const userRoute = Router();

userRoute.get(
  '/',
  asyncMiddWrapper(async (req, res) => {
    const users = await db.get();
    res.json(users);
  }),
);

userRoute.get(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    const user = await db.get(req.params.id);
    if (!user) throw NOT_FOUND_ERROR;
    res.status(200).json(user);
  }),
);

userRoute.post(
  '/',
  asyncMiddWrapper(async (req, res) => {
    if (!req.body.name) {
      throw INPUT_ERROR;
    }
    const userInformation = await db.insert(req.body);

    res.status(201).json(userInformation);
  }),
);

userRoute.put(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    if (!req.body.name) {
      throw INPUT_ERROR;
    }
    const userInformation = await db.update(req.params.id, req.body);
    if (Number(userInformation) === 0) {
      throw NOT_FOUND_ERROR;
    }
    res.status(200).json(userInformation);
  }),
);

userRoute.delete(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    const userInformation = await db.remove(req.params.id);
    if (userInformation === 0) {
      throw NOT_FOUND_ERROR;
    }
    res.status(200).json(userInformation);
  }),
);

export default userRoute;
