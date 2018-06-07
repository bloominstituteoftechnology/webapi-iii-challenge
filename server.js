//database helpers
const postsDb = require('./data/helpers/postDb.js');
const usersDb = require('./data/helpers/userDb.js');
const tagsDb = require('./data/helpers/tagDb.js');

const express = require('express');
const cors = require('cors');
const port = 5050

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Your server on ${port} is up and running!!`);
})


//-------USERS-----------
// get:       /api/users           |       list of users
// get:       /api/users/:id        |    a user matching ID
// post:     /api/users            |    add a user to the users table
// delete:    /api/users/:id        |    delete a user from the users table based on the ID

//get(): calling find returns a promise that resolves to an array of all the resources contained in the database. 
server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res overides so we had comment out
    // res.json('testing get');
});

// get(): if you pass an id to this method it will return the resource with that id if found.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    usersDb
        .get(`${ id }`)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('Success!');
});

//get(): if you pass an id to this method it will return the resource with that id if found.



// insert(): calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: { id: 123 }.
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    usersDb
        .insert({ name })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing post');
});

// update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    usersDb
        .update( id, { name })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    console.log(req.body);
    // res.send('Success!');
});

// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    usersDb
        .remove(id, { name })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing delete');
});





// server.post('/api/users', (req, res) => {
//     const { name, bio } = req.body; 
//     console.log(db.insert({ name, bio }));
// });

//----------POSTS---------
// get:       /api/posts           |       list of posts
// get:       /api/posts/:id        |    a post matching ID
// post:     /api/posts            |    add a post to the posts table
// delete:    /api/posts/:id        |    delete a post from the posts table based on the ID

server.get('/api/posts', (req, res) => {
    postsDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing get');
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    postsDb
        .get(`${ id }`)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('Success!');
});

server.post('/api/posts', (req, res) => {
    const { text, userid } = req.body;
    postsDb
        .insert({ text, userid })
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing post');
});

// update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    postsDb
        .update( id, { text })
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error });
        });
    console.log(req.body);
    res.send('Success!');
});

// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
server.delete( '/api/posts/:id', ( req, res ) =>
{
const { id } = req.params;


postsDb
    .remove( id )
    .then( postRemoved =>
    {
        if ( postRemoved === 0 )
        {
            return error( 404, 'no such post found' );

        } else
        {
            res.json( { success: ' post Removed' } )
        }
    } )
    .catch( err =>
    {
        return error( 500 );
    } );
} );

//----TAGS-----
/*get:       /api/tags               |       list of tags
get:       /api/tags/:id        |    a tag matching ID
post:     /api/tags            |    add a tag to the tags table
delete:    /api/tags/:id        |    delete a tag from the tags table based on the ID*/


// get(): calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if found.
server.get('/api/tags', (req, res) => {
    tagsDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('testing get');
});

// get(): if you pass an id to this method it will return the resource with that id if found.
server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    tagsDb
        .get(`${ id }`)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    // res.json('Success!');
});



server.listen( port, () =>
{
    console.log( `Server listening on port ${ port }` );
} )
