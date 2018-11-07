module.exports = (req, res, next) => {
    res.send(toUpperCase(req.query.thing))
    next();
};
