const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');
const users = require('./data/helpers/userDb.js');
const express= require('express');

const server = express();
server.use(express.json());

const sendStatus = (res,num,data) => {
res.status(num).json(data);
}

server.get('/',(req,res)=>{
res.send('endpoints: /api/users, /api/posts, /api/users/:number, /api/posts:number');
})

server.get('/api/users',(req,res)=>{
users.get()
	.then(response=>{
	sendStatus(res,200,response);
	})
	.catch(error=>{
	sendStatus(res,500,error);
	})
})

server.get('/api/posts',(req,res)=>{
posts.get()
	.then(response=>{
	sendStatus(res,200,response);
	})
	.catch(error=>{
	sendStatus(res,500,error);
	})
})

server.get('/api/users/:id',(req,res)=>{
const { id } = req.params;
users.get(id)
	.then(response=>{
		if(!!response){sendStatus(res,200,response);}
		else{sendStatus(res,404,{message:'user not found'})}
	})
	.catch(error=>{
	sendStatus(res,500,error);
	})
})

server.get('/api/posts/:id',(req,res)=>{
const { id } = req.params;
posts.get(id)
	.then(response=>{
		console.log(response);
		if(!!response){sendStatus(res,200,response);}
		else{sendStatus(res,404,{"message":"user not found"})}
	})
	.catch(error=>{
	console.log(error);
	sendStatus(res,500,error);
	})
})

server.listen(3333,()=>console.log('server listening on port 3333'));