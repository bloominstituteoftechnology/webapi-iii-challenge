const capitalizeFirstLetter = (req, res, next) => {
    const { name } = req.body; 
    if (name) {
        req.body.name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); //capitalize first letter only
    }
    next();
}

module.exports.capitalizeFirstLetter = capitalizeFirstLetter;