const capitalizeFirstLetter = (req, res, next) => {
    const { name } = req.body;
    req.body.name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    next();
}

module.exports.capitalizeFirstLetter = capitalizeFirstLetter;