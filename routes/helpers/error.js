const error = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
}

module.exports = error;