

const nameCheckNLimit = (req, res, next) => {
    let { name } = req.body;
    if (name) {
        if (name.length < 128 && name.length > 0) {
            next();
        }
        this.errorHandler(404, 'No name, no game...whatever that means.;')
    }
};

const errorHandler = (res, code, msg) => {
    res.status(code).json({ message: msg });
}

module.exports = {
    errorHandler,
    nameCheckNLimit
};