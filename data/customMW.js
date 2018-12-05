module.exports.uppercaseUser = (req, res, next) => {
    const user = req.body;
    if (user.name) {
        req.body = { "name": user.name.toUpperCase() };
        next();
    }
    else { next() };
}