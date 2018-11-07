function capitalize(req, res, next) {
    if (req.method === 'GET' && req.url === 'api/users') {
        let users = res.json;
        res.json = function (data) {
            data.forEach(response => response.user = response.user.toUpperCase());
            users.apply(res, arguments);
        }
    }
    next();
}