const upperCase = (req, res, next) => {

    const name = req.body.name;

    if (name) {
        req.body.name = name.toUpperCase();
    };

    next();

}

const otherMW = (req, res, next) => {

}

module.exports = {
    upperCase: upperCase,
    otherMW: otherMW
};