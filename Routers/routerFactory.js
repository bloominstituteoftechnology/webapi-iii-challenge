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
}

module.exports = routerFactory;
