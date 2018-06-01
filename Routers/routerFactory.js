function routerFactory(router, db, errorStatus, errorMessage) {
  router.get(
    '/',
    (req, res, next) => {
      console.log('Hola form router.get');
      db
        .get()
        .then(response => {
          /**
           * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching data from the Database.
           * */
          // throw new Error('Testing server Error');

          res.status(200).json(response);
        })
        .catch(e => {
          e.statusCode = 500;
          e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
          next(e);
        });
    },
    errorHandler
  );

  router.get(
    '/:id',
    (req, res, next) => {
      const { id } = req.params;
      db
        .get(id)
        .then(response => {
          /**
           * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching data from the Database.
           * */
          throw new Error('Testing server Error');

          res.status(200).json(response);
        })
        .catch(e => {
          e.statusCode = 500;
          e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
          next(e);
        });
    },
    errorHandler
  );

  router.delete(
    '/:id',
    (req, res, next) => {
      const { id } = req.params;
      console.log(id);
      db
        .remove(id)
        .then(response => {
          /**
           * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching data from the Database.
           * */
          // throw new Error('Testing server Error');

          res.status(200).json(response);
        })
        .catch(e => {
          e.statusCode = 500;
          e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
          next(e);
        });
    },
    errorHandler
  );

  router.post('/', areArgumentsValid, insertDb, errorHandler);

  router.put(
    '/',
    isIdValid,
    areArgumentsValid,
    (req, res, next) => {
      console.log('insede PUT last handler');

      const { id } = req.body;
      const { ...obj } = req.obj;
      const toUpdate = { ...obj, id };
      console.log(toUpdate);
      db
        .update(id, obj)
        .then(response => {
          console.log('response', response);
          res.status(200).json(`${response} registers updated!`);
        })
        .catch(e => {
          console.log('error', e);
          res.status(500).json('Something went wrong updating!');
        });
    },
    errorHandler
  );

  /**
   * MIDDLEWEARS: List of middlewears use in routes.
   */
  function insertDb(req, res, next) {
    const { ...obj } = req.obj;
    const path = req.baseUrl;
    console.log(obj);

    // This line ensure that the tags are uppercased before they are processed by the request handlers. // This line ensure that the tags are uppercased before they are processed by the request handlers.
    obj.tag ? (obj.tag = obj.tag.toUpperCase()) : null;

    db
      .insert(obj)
      .then(response => {
        /**
         * SOLLELY FOR TESTING PURPOSE: Uncomment the line below to test a failure in the server fetching data from the Database.
         * */
        // throw new Error('Testing server Error');

        res.status(200).json(`New ${path.substring(1)} added!`);
      })
      .catch(e => {
        e.statusCode = 500;
        e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
        next(e);
      });
  }

  function areArgumentsValid(req, res, next) {
    console.log(req.baseUrl);
    const { name, userId, text, tag } = req.body;
    console.log(name, userId, text, tag);

    switch (req.baseUrl) {
      case '/users':
        // do something
        if (name) {
          req.obj = { name };
          next();
        } else {
          e.statusCode = 400;
          e.errorMessage = 'Please provide a name';
          next(e);
        }
        break;
      case '/posts':
        // do something
        if (userId && text) {
          req.obj = { userId, text };
          next();
        } else {
          e.statusCode = 400;
          e.errorMessage = 'Please provide a userId and text';
          next(e);
        }
        break;
      case '/tags':
        // do something
        if (tag) {
          req.obj = { tag };
          next();
        } else {
          e.statusCode = 400;
          e.errorMessage = 'Please provide a tag';
          next(e);
        }
        break;
    }
  }

  function isIdValid(req, res, next) {
    const { id } = req.body;
    console.log(('isIdValid', id));
    db
      .get()
      .then(response => {
        const isIdInData = response.filter(data => data.id === Number(id));
        console.log('isIdInData', isIdInData);
        if (isIdInData[0]) {
          next();
        } else {
          const e = TypeError('Id provide is not int the DB');
          e.statusCode = 400;
          e.errorMessage = 'Please, the Id provide seems to be a invalid Id ion our database, provide a valid Id';
          next(e);
        }
      })
      .catch(e => {
        e.statusCode = 500;
        e.errorMessage = 'Oh, oh.... there is a problem bargain with the dababase, try again!';
        next(e);
      });
  }
  /**
   * Error Handler: Middlewear to handle Errors
   */
  function errorHandler(err, req, res, next) {
    res.status(err.statusCode).json(err.errorMessage);
  }
}

module.exports = routerFactory;
