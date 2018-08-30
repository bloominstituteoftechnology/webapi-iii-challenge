const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./users/usersRoutes.js');
const postRoutes = require('./posts/postsRoutes.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('users/', userRoutes);
app.use('posts/', postRoutes);

const errorHandler = (res, code, msg) => {
    res.status(code).json({message: msg});
}

const nameCheckNLimit = (req, res, next) => {
    let { name } = req.body;
    if(name){
        if(name.length < 128 && name.length > 0){
            next();
        } 
        this.errorHandler(404, 'No name, no game...whatever that means.;')
    }
};

app.listen(9000, () => console.log("Listening on 9000"));