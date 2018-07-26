const express = require('express');
const getError = require('../utilities/getError');

// helper functions

// determines whether an object is iterable
function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

// determines whether an object is a string, or if an object,
// or iterable if whether all values/iterables eventually terminate as strings
function onlyNonEmptyStrings(item) {
  if (typeof item === 'string') {
    return item.length !== 0;
  }
  if (typeof item === 'object') {
    return Object.values(item).every(subItem => onlyNonEmptyStrings(subItem));
  }
  if (isIterable(item)) {
    return Array.from(item).every(subItem => onlyNonEmptyStrings(subItem));
  }
  return false;
}


// Creates an express.Router to handle database calls 
// INPUT
// type: string, refers to the type of data (post, tag, user), used for generating error messages
// shape: string, describes the properties on the type, used for generating error messages
// db: knex QueryBuilder object, imported by server. Contains methods used to generate database queries
// OUTPUT
// return an express.Router object with routes set for various API calls
const makeRouter = (type, shape, db) => {
  const router = express.Router();
  router.use(express.json());
  // Binds the getError import with the type and shape parameters from makeRouter
  const getErrorLocal = (errType, reqType, id) => getError(errType, reqType, type, shape, id);

  router.get('/:id', async (req, res) => {
    let runningError;

    const { id } = req.params;
    try {
      const dbResponse = await db.get(id);
      if (dbResponse === undefined) {
        const { code, message } = runningError || getErrorLocal('data', 'getById');
        res.status(code).json(message);
      } else {
        res.status(200).json(dbResponse);
      }
    } catch (err) {
      const { code, message } = runningError || getErrorLocal('database', 'getById');
      res.status(code).json(message);
    }
  });

  router.get('/', async (req, res) => {
    let runningError;

    try {
      const dbResponse = await db.get();

      // update error info based on successful database call
      if (dbResponse.length === 0) {
        const { code, message } = runningError || getErrorLocal('database', 'getAll');
        res.status(code).json(message);
      } else {
        // send data back
        res.status(200).json(dbResponse);
      }
    } catch (err) {
      const { code, message } = runningError || getErrorLocal('database', 'get');
      res.status(code).json(message);
    }
  });

  router.post('/', async (req, res) => {
    let runningError;
    const { body: payload } = req;

    // throw error due to incomplete post data provided by client
    if (!onlyNonEmptyStrings(payload)) {
      const { code, message } = getErrorLocal('data', 'post');
      res.status(code).json(message);
      return;
    }

    try {
      // Post to server, receiving assigned id as promise
      const dbPostResponse = await db.insert(payload);
      // update error info to reflect successful database save
      runningError = getErrorLocal('partialSuccess', 'post', dbPostResponse.id);

      // Request object from server, receiving assigned id as promise
      const dbGetResponse = await db.get(dbPostResponse.id);
      res.status(201).json(dbGetResponse);
    } catch (err) {
      const { code, message } = runningError || getErrorLocal('database', 'post');
      res.status(code).json(message);
    }
  });

  router.put('/:id', async (req, res) => {
    let runningError;
    const {
      params: { id },
      body: payload,
    } = req;

    // throw error due to incomplete post data provided by client
    if (!onlyNonEmptyStrings(payload)) {
      const { code, message } = getErrorLocal('data', 'put');
      res.status(code).json(message);
      return;
    }

    try {
      // Post to server, receiving assigned id as promise
      const dbResponseId = await db.update(id, payload);
      // update error info to reflect successful database save
      runningError = getErrorLocal('partialSuccess', 'put', dbResponseId);

      // Request object from server, receiving assigned id as promise
      const dbResponsePost = await db.get(id);
      res.status(200).json(dbResponsePost);
    } catch (err) {
      const { code, message } = runningError || getErrorLocal('database', 'put');
      res.status(code).json(message);
    }
  });

  router.delete('/:id', async (req, res) => {
    let runningError;

    const { id } = req.params;
    try {
      const dbResponse = await db.remove(id);
      if (dbResponse === 0) {
        const { code, message } = runningError || getErrorLocal('data', 'delete');
        res.status(code).json(message);
      } else {
        res.status(200).json(id);
      }
    } catch (err) {
      const { code, message } = runningError || getErrorLocal('database', 'delete');
      res.status(code).json(message);
    }
  });

  return router;
};

module.exports = makeRouter;
