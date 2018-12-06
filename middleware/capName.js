const capName = (req, res, next) => {
    const userName = req.body.name;
    if (userName){
    req.body.name = userName.toUpperCase();
    }
    next();
}

module.exports = {
    capName: capName
};

