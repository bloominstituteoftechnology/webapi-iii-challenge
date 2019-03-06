// custom middleware
nameToUppercase = (req, res, next) => { // take in an object
    const NAME = req.body.name.toUpperCase(); // variable equal to uppercase version of user's name
    req.body.name = NAME; // set the users name to its uppercase version
    console.log(req.body.name + ', new spelling of username') // check that user's name has been set to uppercase version
    next();
}

module.exports = nameToUppercase;