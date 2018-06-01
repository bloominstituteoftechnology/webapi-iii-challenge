const validateRequestData = (req, res, next) => {
  const { name } = req.body;
  if (requestExists(name, res) && validUserNameLength(name, res)) {
    next();
  }
}

const requestExists = (name, res) => {
  if (!name) {
    res.status(400).json({ error: 'Please provide the name of the user.' });
    return false;
  }

  return true;
}

const validUserNameLength = (name, res) => {
  if (name.length > 128) {
    res.status(400).json({ error: 'User name cannot exceed 128 characters.' });
    return false;
  }

  return true;
}

module.exports = {
  validateRequestData
}