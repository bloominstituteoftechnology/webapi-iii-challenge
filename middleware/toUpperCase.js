module.exports = (req, res, next) => {
    console.log(req.body.name.toUpperCase());
    req.body.name = req.body.name.toUpperCase();
    // res.send(`${res.body.name}`);
    // console.log(req.body.name)
    next();
}