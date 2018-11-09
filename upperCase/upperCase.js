module.exports = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
};//this seems too simple of a solution...