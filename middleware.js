module.exports.toTitleCase = (req, res, next) => {
    const { name } = req.body;
    if(name) {
        req.body.name = name.toLowerCase().replace(/\b\w/g, I => I.toUpperCase())
        next();
    }
}