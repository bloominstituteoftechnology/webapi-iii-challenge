// function capitalize(req, res, next) {
//     if (req.method === 'GET' && req.url === 'api/users') {
//         let users = res.json;
//         res.json = function (data) {
//             data.forEach(response => response.user = response.user.toUpperCase());
//             users.apply(res, arguments);
//         }
//     }
//     next();
// }

module.exports = {
    capitalize: function (req, res, next) {
        let name = req.body.name;
        name = name.split(" ").map(item => {
            return item = item.substring(0, 1).toUpperCase() + item.substring(1);
        }).join(" ");
        req.body.name = name;
        next();
    }
};