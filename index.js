const server = require('./server.js');
const postDB = require ('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');


const uppercaseName = (req, res, next) => {
        const user = req.body;
        user.name = user.name.toUpperCase();
        next();
}
   


server.get('/api/posts',(req,res)=>{
    postDB.get()
    .then(posts =>{
        res.json(posts)
    })
    .catch(err =>{
        res.status(500).json({error: 'the posts could not be retrieved'})
    })
})

server.get('/api/users', (req, res) => {
    userDB.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'the users could not be retrieved' })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    postDB.get(id)
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: 'the post could not be retrieved' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    userDB.get(id)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'the user could not be retrieved' })
        })
})

server.post('/api/users', uppercaseName, (req, res)=>{
    const userInfo = req.body;
    userDB.insert(userInfo)
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=> res.status(400).json({errorMessage: 'please provide user info'}))
})


server.listen(5000,()=> console.log('server running on port 5000'))