module.exports = function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        next({code: 403});
    }
};