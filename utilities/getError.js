// a errType is 'data', 'database', or 'client', and describes the flaw that caused the error
// a reqType is "get", "put", etc.
// a targetType is the type of data object (e.g, post, user, etc.)
// a targetShapes describes the noteworthy keys on the json object being requested.
// an id is an optional parameter referring to the data object the request is dealing with
function getError(errType, reqType, targetType, targetShape, id = null) {
  let problem = '';
  let upshot = '';
  let code;
  switch (errType) {
    case 'database':
      problem = `Your ${reqType} request to the database server request failed.`;
      code = 500;
      switch (reqType) {
        case 'post':
          upshot = `The provided ${targetType} was not saved.`;
          break;
        case 'delete':
          upshot = `Requested ${targetType} data was not deleted.`;
          break;
        case 'getById':
          upshot = `Ensure requested ${targetType} ID exists on server. Otherwise contact your database administrator.`;
          break;
        default:
          upshot = 'Please contact your database administrator';
          break;
      }
      break;

    case 'partialSuccess':
      problem = `Your ${reqType} to the database server was saved, but ${targetType} could not be returned.`;
      upshot = `Please request the object directly with a get request to the server, using the id of ${id}`;
      code = 201;
      break;

    case 'data':
      problem = `Database responded, but the ${targetType} ${reqType} request was not successful.`;
      code = 404;
      switch (reqType) {
        case 'post':
          upshot = 'Please ensure that your request is well constructed, with input for all required strings.';
          break;
        case 'put':
          upshot = `Please ensure that your request is well constructed, with input for all required strings, and that the database contains the ${targetType} you are trying to update.`;
          break;
        case 'delete': case 'getById':
          upshot = `Please ensure the id refers to a ${targetType} contained in the database.`;
          break;
        default:
          upshot = 'Please ensure that your request is well constructed, with input for all required strings, and that the database has been populated.';
          break;
      }
      break;

    default:
      problem = 'Request could not be served.';
      code = 400;
      break;
  }

  return { code, message: `${problem} ${upshot}` };
}

module.exports = getError;
