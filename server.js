const express = require( 'express' );
const cors = require( 'cors' );

const posts = require( './data/helpers/postDb.js' );
const tags = require( './data/helpers/tagDb.js' );
const users = require( './data/helpers/userDb.js' );

const port = 5000;
const server = express();
server.get( '/api/users' );
server.get( '/api/posts' );
server.get( '/api/tags' );
server.use( express.json() );
server.use( cors() );

// server.get( '/', ( req, res ) =>
// {
//     res.send( 'hello from server' );
// } );
//get list of users
server.get( '/api/users', ( req, res ) =>
{

    users


        .get()
        .then( users =>
        {

            res.json( users );
        } )
        .catch( error =>
        {

            res.status( 500 ).json( error );
        } );

} );
// get by id users
server.get( '/api/users/:id', ( req, res ) =>
{
    const { id } = req.params;

    users

        .get( id )
        .then( users =>{

            res.json( users );
        } )
        .catch( error =>
        {

            res.status( 500 ).json( error );
        } );
} );
//post not work
server.post( '/api/users', ( req, res ) =>
{
    const { name } = req.body;

    users
        .insert( { name } )
        .then( users =>
{
            
            res.json( { users } );
        } )
        .catch( error => 
        {
            res.json( { error } );
        } );
            
            

            } );
        

server.put( '/api/users/:id', (req, res ) =>
{
    const { id } = req.params;
    const { name } = req.body;
    users
        .update( id, { name } )
        .then( users =>
        {
            res.json( { users } );
        } )
        .catch( error =>
        {
            res.json( { error } );
        } );
});

//try toget delete button to work
server.delete( '/api/users/:id', ( req, res ) =>{
    
})

//get all tags
server.get( '/api/tags', ( req, res ) =>
{
    tags


        .get()
        .then( tags =>
        {
            res.json( tags );
        } )
        .catch( error =>
        {
            res.status( 500 ).json( error );
        } );

} );
//get tags by id
server.get( '/api/tags/:id', ( req, res ) =>
{
    const { id } = req.params;

    tags

        .get( id )
        .then( tags =>
        {

            res.json( tags );
        } )
        .catch( error =>
        {

            res.status( 500 ).json( error );
        } );
} );
//post for tags
server.post( '/api/tags', ( req, res ) =>
{
    const { tag } = req.body;

    tags
        .insert( { tag } )
        .then( tags =>
        {

            res.json( { tags } );
        } )
        .catch( error => 
        {
            res.json( { error } );
        } );



} );

//get all posts
server.get( '/api/posts', ( req, res ) =>
{
    posts

        .get()
        .then( posts =>
        {
            res.json( posts );
        } )
        .catch( eror =>
        {
            res.status( 500 ).json( error );
        } );
} );
//post by id
server.get( '/api/posts/:id', ( req, res ) =>
{
    const { id } = req.params;

    posts

        .get( id )
        .then( posts =>
        {

            res.json( posts );
        } )
        .catch( error =>
        {

            res.status( 500 ).json( error );
        } );
} );
// posts for posts
server.post( '/api/posts', ( req, res ) =>
{
    const { userId, text } = req.body;

    posts
        
        .insert( { userId, text } )
        .then( response =>{

            res.json( { response  } );
        } )
        .catch( error => 
        {
            res.json( { error } );
        } );

} );

    server.listen( port, () =>{( `server running....${ port }` );} )
