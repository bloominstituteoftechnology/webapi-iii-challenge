function logger(req, res, next) {
  console.log(
    `The Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}

module.exports = logger;
