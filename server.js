const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const postDb = require( './data/helpers/postDb' );
const userDb = require( './data/helpers/userDb' );
const tagDb = require( './data/helpers/tagDb' );
const CORS = require( 'cors' );

const port = 8080
const server = express();

server.use( express.json() );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );
server.use( CORS() );

// ! TEST
// server.get( '/', ( req, res ) => {
//     res.send(`Your server is running on port ${ port }`);
// })


// * USERS
// get: /api/users | list of users
server.get( '/api/users', ( req, res ) =>
{
    userDb
        .get()
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
        // The following is a test to check if it works.
        // res.json( 'testing get' );
} );

// get: /api/users /: id | a user matching ID
server.get( '/api/users/:id', ( req, res ) =>
{
    const { id } = req.params;
    userDb
        .get( `${ id }` )
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    // The following is a test to check if it works.
    //res.json( 'Success!' );
} );

// post: /api/users | add a user to the users table
server.post( '/api/users', ( req, res ) =>
{
    const { name } = req.body;
    userDb
        .insert( { name } )
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    // The following is a test to check if it works.
    // res.json( 'testing post' );
} );

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put( '/api/users/:id', ( req, res ) =>
{
    const { id } = req.params;
    const { name } = req.body;
    userDb
        .update( id, { name } )
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    console.log( req.body );
    // The following is a test to check if it works.
    // res.send( 'Success!' );
} );

// delete: /api/users /: id | delete a user from the users table based on the ID
server.delete( '/api/users/:id', ( req, res ) =>
{
    const { id } = req.params;
    const { name } = req.body;
    userDb
        .remove( id, { name } )
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
        // The following is a test to check if it works.
        // res.json( 'testing delete' );
} );

// * Posts


// post: /api/posts | add a post to the posts table
// delete: /api/posts /: id | delete a post from the posts table based on the ID

// get: /api/posts | list of posts
server.get( '/api/posts', ( req, res ) =>
{
    postDb
        .get()
        .then( posts =>
        {
            res.json( { posts } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    // The following is a test to check if it works.
    // res.json( 'testing get' );
} );

// get: /api/posts /: id | a post matching ID
server.get( '/api/posts/:id', ( req, res ) =>
{
    const { id } = req.params;
    postDb
        .get( `${ id }` )
        .then( posts =>
        {
            res.json( { posts } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    // The following is a test to check if it works.
    //res.json( 'Success!' );
} );

// post: /api/posts | add a post to the posts table
server.post( '/api/posts', ( req, res ) =>
{
    const { postedBy, text } = req.body;
    postDb
        .insert( { postedBy, text } )
        .then( posts =>
        {
            res.json( {posts}  );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    // The following is a test to check if it works.
    // res.json( 'testing post' );
} );


// Updates the post with the specified id using data from the request body. 
// ! Returns the modified document, NOT the original.
server.put( '/api/posts/:id', ( req, res ) =>
{
    const { id } = req.params;
    const { post, text } = req.body;
    postDb
        .update( id, { post, text } )
        .then( posts =>
        {
            res.json( { posts } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
    console.log( req.body );
    // The following is a test to check if it works.
    // res.send( 'Success!' );
} );

// * Tags
// get: /api/tags | list of tags
// get: /api/tags /: id | a tag matching ID
// post: /api/tags | add a tag to the tags table
// delete: /api/tags /: id | delete a tag from the tags table based on the ID

// get: /api/postsbyid /: id | lists of posts by a speciffic user ID
// get: /api/posttags /: id | a list of tags by a speciffic post ID


server.listen( port, () =>
{
    console.log( `Server listening on port ${ port }` );
} )
