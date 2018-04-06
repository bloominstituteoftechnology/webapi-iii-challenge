/* Catches Promise rejections and passes it along to handleErrors */
exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next)

/* Error handler */
exports.handleErrors = (err, req, res, next) => {
  const errorDetails = {
    status: err.status,
    message: err.message,
    stack: err.stack || ''
  }
  res.status(err.status || 500).json(errorDetails)
}