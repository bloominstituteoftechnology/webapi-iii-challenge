const express = require('express');
const axios = require('axios');
const postDb = require('../data/helpers/postDb');

// getError creates an error message. Signature is getError(errType, targetKeys, reqType).
const getError = require('../utilities/getError');

const router = express.Router();
router.use(express.json());

const targetKeys = 'title and contents';

router.get('/', async (req, res) => {
  try {
    const dbResponse = await postDb.get();
    if (dbResponse.length === 0) {
      const { code, message } = getError('data', targetKeys, 'get');
      res.status(code).json(message);
    }
    res.status(200).json(dbResponse);
    json(dbResponse);
  } catch (err) {
    const { code, message } = getError('database', targetKeys, 'get');
    res.status(code).json(message);
  }
});

module.exports = router;
