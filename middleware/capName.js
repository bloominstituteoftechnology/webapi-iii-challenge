const capName = (req, res, next) => {
    const userName = req.body.name.toUpperCase();
    req.body.name = userName;
    next();
}

module.exports = {
    capName: capName
};