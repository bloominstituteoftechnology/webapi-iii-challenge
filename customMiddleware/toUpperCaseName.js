const loudName = (req, res, next) => {
    req.body.loudName = req.body.name.toUpperCase()
    next();
}

module.exports = loudName;