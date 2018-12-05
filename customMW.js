module.exports.uppercaser = (req, res, next) => {
    const user = req.body;
    if (req.method === 'POST' || req.method === 'PUT' ) {
            user.name = user.name.toUpperCase();
            next();
    } else {
        next();
    }
}