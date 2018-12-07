const upperCase = (req, res, next) => {
    const name = req.body.name;
  
    if (name) {
        const capitalizedString = name.toUpperCase();
        req.body.name = capitalizedString;
    } 
    next();
};

module.exports = upperCase;