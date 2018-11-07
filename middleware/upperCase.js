module.exports = (req, res, next) => {
    const { body } = req;

    console.log(body.name.length);
    if (!body.name.length) {
        res.status(400).json({message: 'Name is required'})
    }
    req.body.name = body.name.toUpperCase();
    next();

}