const yell = (req, res, next) => {
	req.yelledUser = { ...req.body};
	req.yelledUser.name = req.yelledUser.name.toUpperCase();
	next();
};

module.exports = yell;
