const express = require('express');
const axios = require('axios');
const postDb = require('../data/helpers/postDb');

// getError creates an error message. Signature is getError(errType, targetKeys, reqType).
const getError = require('../utilities/getError');

const router = express.Router();
router.use(express.json());

const targetKeys = 'userId and text';

router.get('/:id', async (req, res) => {
  let runningError;

  const { id } = req.params;
  try {
    const dbResponse = await postDb.get(id);
    res.status(200).json(dbResponse[0]);
  } catch (err) {
    const { code, message } = runningError || getError('database', targetKeys, 'getById');
    res.status(code).json(message);
  }
});

router.get('/', async (req, res) => {
  let runningError;

  try {
    const dbResponse = await postDb.get();

    // update error info based on successful database call
    if (dbResponse.length === 0) {
      const { code, message } = runningError || getError('database', targetKeys, 'getById');
      res.status(code).json(message);
    }

    // send data back
    res.status(200).json(dbResponse);
  } catch (err) {
    const { code, message } = runningError || getError('database', targetKeys, 'get');
    res.status(code).json(message);
  }
});

router.post('/', async (req, res) => {
  let runningError;
  const { userId, text } = req.body;

  // throw error due to incomplete post data provided by client
  if (userId === undefined || userId === '' || text === undefined || text === '') {
    const { code, message } = getError('data', targetKeys, 'post');
    res.status(code).json(message);
  }

  try {
    // Post to server, receiving assigned id as promise
    const dbResponseId = await postDb.insert({ userId, text });
    // update error info to reflect successful database save
    runningError = getError('partialSuccess', targetKeys, 'post', dbResponseId);

    // Request object from server, receiving assigned id as promise
    const dbResponsePost = await postDb.get(dbResponseId.id);
    res.status(201).json(dbResponsePost);
  } catch (err) {
    const { code, message } = runningError || getError('database', targetKeys, 'post');
    res.status(code).json(message);
  }
});

router.put('/:id', async (req, res) => {
  let runningError;
  const { params: { id }, body: { userId, text } } = req;

  // throw error due to incomplete post data provided by client
  if (userId === undefined || userId === '' || text === undefined || text === '') {
    const { code, message } = getError('data', targetKeys, 'put');
    res.status(code).json(message);
  }

  try {
    // Post to server, receiving assigned id as promise
    const dbResponseId = await postDb.update(id, { userId, text });
    // update error info to reflect successful database save
    runningError = getError('partialSuccess', targetKeys, 'put', dbResponseId);

    // Request object from server, receiving assigned id as promise
    const dbResponsePost = await postDb.get(id);
    res.status(200).json(dbResponsePost);
  } catch (err) {
    const { code, message } = runningError || getError('database', targetKeys, 'put');
    res.status(code).json(message);
  }
});

module.exports = router;
