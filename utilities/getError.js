// getError creates an error message. Signature is getError(errType, targetKeys, reqType).
// a reqType is "get", "put", etc.
// a errType is 'data', 'database', or 'client', and describes the flaw that caused the error
// a targetKeys describes the noteworthy keys on the json object being requested.

function getError(errType, target, reqType) {
  let problem = '';
  let upshot = '';
  let code;
  switch (errType) {
    case 'database':
      problem = 'Database server request failed.';
      code = 500;
      switch (reqType) {
        case 'post':
          upshot = `The provided ${target} was not saved.`;
          break;
        case 'delete':
          upshot = 'Requested data was note deleted.';
          break;
        default:
          upshot = 'Please contact your database administrator';
          break;
      }

    case 'data':
      problem = 'Data not found.';
      upshot = 'Please ensure that your request is well constructed and that the database has been populated.';
      code = 404;
      break;

    case 'client':
      problem = `Data provided was incomplete. Please ensure that ${target} properties are non-empty strings.`;
      code = 400;
      break;

    default:
      problem = 'Request could not be served.';
      code = 400;
      break;
  }

  return { code, message: `${problem} ${upshot}` };
}

module.exports = getError;
