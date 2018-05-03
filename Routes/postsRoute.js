import express from 'express';
import db from '../data/helpers/postDb';
import { asyncMiddWrapper } from '../utils';
import { NOT_FOUND_ERROR, INPUT_ERROR } from '../Errors';

// /posts
const postsRoute = express.Router();

postsRoute.get(
  '/',
  asyncMiddWrapper(async (req, res) => {
    const users = await db.get();
    res.json(users);
  }),
);

postsRoute.get(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    console.log(req.params.id, req.params.index);
    const post = await db.get(+req.params.id);
    if (!post.text) throw NOT_FOUND_ERROR;
    res.json(post);
  }),
);

postsRoute.post(
  '/',
  asyncMiddWrapper(async (req, res) => {
    if (!req.body) {
      throw INPUT_ERROR;
    }
    const userInformation = await db.insert(req.body);
    res.status(201).json(userInformation);
  }),
);

postsRoute.put(
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

postsRoute.delete(
  '/:id',
  asyncMiddWrapper(async (req, res) => {
    const userInformation = await db.remove(req.params.id);
    if (userInformation === 0) {
      throw NOT_FOUND_ERROR;
    }
    res.status(200).json(userInformation);
  }),
);

export default postsRoute;
