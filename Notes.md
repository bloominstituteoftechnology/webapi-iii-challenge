# Back End Journey

* Build a RESTful API using Express and Node.js. (this week)
* Persist API Data to a Database.
* Secure an API.
* Test, Package and Deploy an API.
* Full Stack Project.

## Build a RESTful API using Express and Node.js

* initializing a node project with `npm init`
* adding _npm scripts_ to `package.json`
* production dependencies vs development dependencies
* yarn.lock & package.lock.json

- HTTP (Theory)
  * methods.
    * POST, GET, PUT, DELETE
  * status codes.
    * 200 (OK), 201 (CREATED), 400 (BAD REQUEST), 404 (NOT FOUND), 500(SERVER ERROR)
    * 200 - 299: SUCCESS
    * 300 - 399: REDIRECTS
    * 400 - 499: USER/CLIENT ERROR
    * 500 - 599: SERVER ERROR
- REST (Theory)
  * REpresentational State Transfer
  * resource thinking
  * endpoint design, single endpoint per resource.
- Node (Theory and Practice)
  * advantages
    * no context switching.
    * same paradigm.
    * single threaded.
    * async
  * disadvantages
    * single threaded.
    * async
- Express (Theory and Practice)
  * advantages
    * minimalistic
    * extendible
  * disadvantages
    * minimalistic
  * core parts
    * routing
    * middleware
    * sub-applications
  * code!!
- Postman (Tooling)

  * why
  * how (demo)

  An API in this context is a server software that publishes a set of **endpoints** that clients can use to manage **resources**.

## Tuesday

### Review

* what is Node.js?
* what are two advantages of using Node.js to build our APIs?
* how many request handlers can we have when using Node.js http server module to build web applications?
* what is Express?
* why would you use Express instead of raw Node.js to build web applications/APIs?
* what is the relationship between Node.js and Express?
* when building API endpoints, which parts of the HTTP specifications do we need to keep in mind?
* which http status code range is used to convey successful responses? which for server errors? client errors? redirection?
* when building RESTful APIs what do we mean by a _Resource_?
* in our context, what do we mean by API?

### Topics

* finish CRUD operations (POST, DELETE, PUT).
* reading data from the body of the request.
* reading data from the query string inside the URL.
* introduce **Middleware** and use built-in and third party **Middleware**.
* use _Postman_ to test our APIs.
* introduction to REST

#### Middleware.

[Client] - makes - (request) - [Middleware Queue] - [Request/Route Handler Functions (they are middleware)]

## Wednesday

### Review

* what are the three ways of receiving data from the client?
* what can we do with middleware?
* which middleware did we use to help express read JSON from the body? is it third party middleware or built-in middleware?

## Topics

* what do we mean by RESTful API
* REST constraints.
* writing custom middleware

### REST (REpresentational State Transfer)

* principles and constraints. Recommendations, not law.

#### Constraints.

* client-server architecture.
* stateless architecture: requests are not related to each other, they stand on their own.
* cacheable
  * GET, PUT, DELETE should be _idempotent_.
  * normally through ETag header
* layered system
    * the client shout not know if it is connected directly to the server (Load Balancers, Server Farm, Logger) 
* code on demand
    * The server can change the clients behaviour, or functionality by sending code down the network
* uniform interfaces
    * one URL per resource

clients <=> [Load Balance I + Load Balancer II] <=> [Logging] <=> [Caching] <=> [Server Farm (application / API)]

  An API in this context is a server software that publishes a set of **endpoints** that clients can use to manage **resources**.

## Tuesday

### Review

* what is Node.js?
* what are two advantages of using Node.js to build our APIs?
* how many request handlers can we have when using Node.js http server module to build web applications?
* what is Express?
* why would you use Express instead of raw Node.js to build web applications/APIs?
* what is the relationship between Node.js and Express?
  * normally through ETag header
* layered system.
  * the client should not know if it is connected directly to the server.
* code on demand.
  * the server can change the client's functionality by sending code down the network.
* uniform interfaces.
  * one URL per resource.

clients <=> [Load Balancer1 + LB2] <=> [Logging] <=> [Caching] <=> [Server Farm (application/API)]

## Thursday

### Review

* what is REST?
* mention one constraint.
* what arguments are passed to custom middleware functions? trick question!
* is routing a type of middleware?
* what can se use to break up our application into modules?

## Topics

* using Routers to modularize application
* configuring sub-routes
* ordering routes
* configuring CORS for SPA + API architecture
* Q & A.

### Sub applications (Routers)

* MVC vs MRC
* Model = deals with the data
* Routes = interface with the client (request/response)
* Controller = business logic, unique to the application

users can be assigned a role (admin, sales, accounting, support)

I need to see which roles are assigned to a user `/api/users/:id/roles`
I need to add roles to a user
I need to add users to a role
I want to know which users have a role assigned `/api/roles/:id/users`

Resources: users, roles

File Structure

* by type (actions, action-creators, components, reducers)
* by feature (by resource) -> users, roles, permissions, products, orders, clients, shipping

### Sub-Routes

**Domain Experts provide these**

* I want to see all the orders for a user
* I want to see all comments that belong to a post
* I want to see all labels that belong to an email
* I want to see all payments for an order

There is more than one way of answering these questions

* `/api/users/:id/orders` || `/api/orders?userid=123`
* `/api/orders/:id/payments?year=2018&month=2017`

### Review

* provide an example of a sub-route
* why do we need to configure CORS in our server?