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
}

module.exports = routerFactory;
