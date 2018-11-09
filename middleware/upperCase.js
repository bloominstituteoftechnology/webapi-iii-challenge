module.exports = (req, res, next) => {
  req.body.name = req.body.name
                                .toLowerCase()
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
  
	next(); 
};