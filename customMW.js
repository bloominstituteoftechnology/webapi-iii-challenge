module.exports.uppercaser = (req, res, next) => {
    const user = req.body;
    if (req.body.name) {
    if (req.method === 'POST' || req.method === 'PUT' ) {
            user.name = user.name.toUpperCase();
            next();
    } else {
        next();
    }
} else {
    next();
}
}