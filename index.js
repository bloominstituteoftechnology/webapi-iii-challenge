server.use(logger);

server.get('/name/:name') yell, greeter, (req, res) => {
    res.send(req.name);
});