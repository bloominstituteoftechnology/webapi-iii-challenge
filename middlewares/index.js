const getTagToUpperCase = (req, res, next) => {
    let oldSend = res.send;

    res.send = function(data) {
      // arguments[0] (or `data`) contains the response body
      arguments[0] = arguments[0].toUpperCase();
      oldSend.apply(res, arguments);
    };

    next();
}

const tagToUpperCase = (req, res, next) => {
    if(req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }

    next();
}

module.exports = {
  getTagToUpperCase,
  tagToUpperCase,
};