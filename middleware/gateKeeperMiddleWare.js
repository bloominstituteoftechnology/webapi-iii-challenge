module.exports = (req, res, next) => {
    if(req.query.id === req.params.id) {
        console.log('Success');
        req.welcomeMessage = 'Welcome user'
        next();
    } else {
        console.log(req.params);
        res.send('No entry');
    }
}