// constants for export
const badDataRetreival = { message: "That data could not be retreived" };
const badDataInsert = {
  message: "That information could not be added to the database"
};
const badDataRemoval = { message: "That data could not be deleted" };
const badID = { message: "That data does not exist" };
const badDataUpdate = {message: "The data did not update"}

// capitalize
const capUser = {};

const capitalize = (req, res, next) => {
  if (req.body) {
    capUser.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(word => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
    next();
  } else next();
};

module.exports = {
  capitalize: capitalize,
  capUser: capUser,
  badDataRetreival: badDataRetreival,
  badDataInsert: badDataInsert,
  badDataRemoval: badDataRemoval,
  badID: badID,
  badDataUpdate: badDataUpdate
};
