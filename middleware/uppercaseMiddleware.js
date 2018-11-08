module.exports = (req, res, next) => {
    console.log(req.body);
    const uppercase = req.body.name.toUpperCase();
    req.body.name = uppercase;
    next();
}