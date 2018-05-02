const c = prop => body => typeof body[prop] === 'string';
const checkForTitle = body => c('title')(body);
const checkForContents = body => c('contents')(body);

const validateBody = body => checkForTitle(body) && checkForContents(body);

const inputError = {
  errorMessage: 'Please provide title and contents for the post.'
};
const saveError = {
  error: 'There was an error while saving the post to the database'
};
const getError = { error: 'The posts information could not be retrieved.' };

const notFoundError = {
  message: 'The post with the specified ID does not exist.'
};

const retrieveFailedError = {
  error: 'The post information could not be retrieved.'
};

const putFailedError = { error: 'The post information could not be modified.' };

module.exports = {
  validateBody,
  inputError,
  saveError,
  getError,
  notFoundError,
  retrieveFailedError,
  putFailedError
};
