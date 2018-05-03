import express from 'express';
import db from '../data/helpers/tagDb';
import { asyncMiddWrapper } from '../utils';
import { NOT_FOUND_ERROR, INPUT_ERROR } from '../Errors';

// /posts
const postTagsRoute = express.Router();

postTagsRoute.get(
  '/',
  asyncMiddWrapper(async (req, res) => {
    const users = await db.get();
    res.json(users);
  }),
);

postTagsRoute.get(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    console.log(req.params.id, req.params.index);
    const user = await db.get(+req.params.id);
    //  if (!user.length) throw NOT_FOUND_ERROR;
    res.json(user);
  }),
);

postTagsRoute.post(
  '/',
  asyncMiddWrapper(async (req, res) => {
    if (!req.body) {
      throw INPUT_ERROR;
    }
    const userInformation = await db.insert(req.body);
    res.status(201).json(userInformation);
  }),
);

postTagsRoute.put(
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

postTagsRoute.delete(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    const userInformation = await db.remove(req.params.id);
    if (userInformation === 0) {
      throw NOT_FOUND_ERROR;
    }
    res.status(200).json(userInformation);
  }),
);

export default postTagsRoute;
