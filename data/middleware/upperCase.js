const tagsDB = require('../helpers/tagDb');

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

const upperCase = (req, res, next) => {
  const { id } = req.params;
  tagsDB
    .get()
    .then(tags => {
      let tagsCopy;
      if (id) {
        tagsCopy = tags.filter(obj => {
          return obj.id == id;
        });
        tagsCopy[0].tag = tagsCopy[0].tag.toUpperCase();
        tagsCopy = tagsCopy[0];
      } else {
        tagsCopy = tags.map(obj => {
          return Object.assign({}, obj, { tag: obj["tag"].toUpperCase() });
        });
      }
      console.log("tags: ", tagsCopy);
      req.body.tags = tagsCopy;
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