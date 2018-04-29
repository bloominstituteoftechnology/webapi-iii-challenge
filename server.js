const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const postDB = require('./data/helpers/postDb.js');
const tagDB = require('./data/helpers/tagDb.js');

const app = express();
app.use(express.json());


app.delete('/api/tags/:id',(req,res)=>{
  tagDB.remove(req.params.id).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});


app.put('/api/tags/:id',(req,res)=>{
  tagDB.update(req.params.id,req.body).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});


app.post('/api/tags',(req,res)=>{
  tagDB.insert(req.body).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.get('/api/tags/:id',(req,res)=>{
  tagDB.get(req.params.id).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});


app.get('/api/posts/tags/:id',(req,res)=>{
  postDB.getPostTags(req.params.id).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.get('/api/posts/:id',(req,res)=>{
  postDB.get(req.params.id).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.post('/api/posts',(req,res)=>{
  postDB.insert(req.body).then(response=>{
    res.status(201).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.put('/api/posts/:id',(req,res)=>{
  postDB.update(req.params.id,req.body).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.delete('/api/posts/:id',(req,res)=>{
  postDB.remove(req.params.id)
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.get('/api/users',(req,res)=>{
  userDB.get().then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

app.put('/api/users/:id',(req,res)=>{
  userDB.update(req.params.id,req.body)
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});



app.post('/api/users',(req,res)=>{
  userDB.insert(req.body).then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});



app.listen(5000);
