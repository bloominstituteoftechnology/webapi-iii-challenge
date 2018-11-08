function capalizeString(name) {
    let str = name;
    let res = str.split(" ");
    res = name.charAt(0).toUpperCase() + name.slice(1);

}

module.exports = (req, res, next) => {
    const { name } = req.body;
    if(name) {
        console.log(req.body)
        req.body.name = name.charAt(0).toUpperCase() + name.slice(1);
        capalizeString(name);
        next();
    } else {
        res.send('first letter is already uppercased');
    }
}