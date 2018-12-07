const uppercase = (req, res, next) => {
    const name = req.body.name;
    if (name) {
    let arr = name.split(' ');
    for (i=0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    req.body.name = arr.join(' ')
    }
    next();
  };

  module.exports = {
      uppercase: uppercase
  };