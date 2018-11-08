module.exports = (req, res, next) => {
	// next points to the next middleware/route handler in the queue
	req.body.name = req.body.name.toUpperCase();
	next(); // continue to the next middleware
};
