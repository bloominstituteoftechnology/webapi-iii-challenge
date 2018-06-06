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
server.listen( 5000, () =>
{
    ( `server running....${ port }` );
})
server.get( '/', ( req, res ) =>
{
    res.send( 'hello from server' );
} );
server.get( '/api/users', ( req, res ) =>{
   
    users
    
    
        .get()
        .then(users => { 

            res.json(users );
        } )
        .catch( error =>{
            
            res.status( 500 ).json( error );
        } );
    
} );
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
