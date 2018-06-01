function routerFactory(router, db, errorStatus, errorMessage) {
  router.get("/", (req, res) => {
    console.log("Hola form router.get");
    db
      .get()
      .then(response => {
        console.log("response", response);
        res.status(200).json(response);
      })
      .catch(e => {
        console.log("error", e);
        res.status(errorStatus).json(errorDb);
      });
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);

    db
      .get(id)
      .then(response => {
        console.log("response", response);
        res.status(200).json(response);
      })
      .catch(e => {
        console.log("error", e);
        res.status(errorStatus).json(errorDb);
      });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db
      .remove(id)
      .then(response => {
        console.log("response", response);
        res.status(200).json(response);
      })
      .catch(e => {
        console.log("error", e);
      });
  });

  router.post("/", areArgumentsValid, insertDb);

  router.put("/", isIdValid, areArgumentsValid, (req, res) => {
    console.log("insede PUT last handler");

    const { id } = req.body;
    const { ...obj } = req.obj;
    const toUpdate = { ...obj, id };
    console.log(toUpdate);
    db
      .update(id, obj)
      .then(response => {
        console.log("response", response);
        res.status(200).json(`${response} registers updated!`);
      })
      .catch(e => {
        console.log("error", e);
        res.status(500).json("Something went wrong updating!");
      });
  });

  /**
   * MIDDLEWEARS: List of middlewears use in routes.
   */
  function insertDb(req, res) {
    const { ...obj } = req.obj;
    const path = req.baseUrl;
    console.log(obj);

    // This line ensure that the tags are uppercased before they are processed by the request handlers.
    obj.tag ? (obj.tag = obj.tag.toUpperCase()) : null;

    db
      .insert(obj)
      .then(response => {
        console.log("response", response);
        res.status(200).json(`New ${path.substring(1)} added!`);
      })
      .catch(e => {
        console.log("error", e);
        res.status(500).json("Database Error: Impossible to insert new register");
      });
  }

  function areArgumentsValid(req, res, next) {
    console.log(req.baseUrl);
    const { name, userId, text, tag } = req.body;
    console.log(name, userId, text, tag);

    switch (req.baseUrl) {
      case "/users":
        // do something
        if (name) {
          req.obj = { name };
          next();
        } else {
          res.status(400).json("Please provide a name");
        }
        break;
      case "/posts":
        // do something
        if (userId && text) {
          req.obj = { userId, text };
          next();
        } else {
          res.status(400).json("Please provide a userId and text");
        }
        break;
      case "/tags":
        // do something
        if (tag) {
          req.obj = { tag };
          next();
        } else {
          res.status(400).json("Please provide a tag");
        }
        break;
    }
  }

  function isIdValid(req, res, next) {
    const { id } = req.body;
    console.log(("isIdValid", id));
    db
      .get()
      .then(response => {
        const isIdInData = response.filter(data => data.id === Number(id));
        console.log("isIdInData", isIdInData);
        isIdInData[0]
          ? next()
          : res.status(400).json("Please, provide a vlaid Id");
      })
      .catch(e => {
        console.log("error", e);
      });
  }
}

module.exports = routerFactory;
