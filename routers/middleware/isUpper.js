module.exports = function isUpper(req, res, next) {
    // console.log(req.body.tag.toUpperCase());
    req.body.tag = req.body.tag.toUpperCase();
    next();
};