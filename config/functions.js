const sendError = (status, errorMessage, res) => {
    res.status(status).json({ error: errorMessage });
  };

  module.exports = sendError