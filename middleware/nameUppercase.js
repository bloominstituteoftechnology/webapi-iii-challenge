function upperCase(req, res, next) {
    const name = req.body.name;
    if (name){
        const capitalized = name.toUppercase();
        req.body.name = capitalized;
    }
    next();
};

module.exports = upperCase;