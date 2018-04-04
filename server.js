const express = require('express');
const userDB = require('./data/helpers/userDb.js');

const app = express();
app.use(express.json());


app.get('/api/users',(req,res)=>{
  userDB.get().then(response=>{
    res.json(response);
  })
  .catch(err=>{
    res.json(err);
  });
});

app.put('/api/users/:id',(req,res)=>{
  userDB.update(req.params.id,req.body)
  .then(response=>{
    res.json(response);
  })
  .catch(err=>{
    res.json(err);
  });
});

app.post('/api/users',(req,res)=>{
  userDB.insert(req.body).then(response=>{
    res.json(response);
  })
  .catch(err=>{
    res.json(err);
  });
});



app.listen(5000);
