


function greeter(x) {
    return function (req, res, next) {
        console.log(x);

        if (req.query.pass ==='mellon') {
            next();
        }
        else {
            res.send('YOU SHALL NOT PASS!!!!');
        }
    }
}

function logger(msg) {
    return function (req, res, next) {
        console.log(`${msg}: ${req.url}`);
         next();
    };
}





module.exports = {greeter, logger}