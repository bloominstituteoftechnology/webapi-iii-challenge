module.exports = pascalcase = (req, res, next) => {
    let name = req.body.name;
    name = name.split('');
    name[0] = name[0].toUpperCase();
    name = name.join('')
    req.body.name = name;
    next();
}