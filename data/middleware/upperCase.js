const tagsDB = require('../helpers/tagDb');

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

const upperCase = (req, res, next) => {
  tagsDB
    .get()
    .then(tags => { // tags is an array of objects
      tags = tags.map(obj => {
        return Object.assign({}, obj, { tag: obj["tag"].toUpperCase() });
      });
      console.log("tags: ", tags);
      res.json(tags);
    })
    .catch(error => {
      sendError(
        500,
        "Something went terribly wrong!",
        res
      );
    });
  next();
}

module.exports = upperCase;