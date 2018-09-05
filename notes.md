what is middleware def from Redux?
intercepts data and does things for you and useful, part of async operations  

Middleware notes

Client - request - [-> Server]

Inside the Server...

request -[-> m1 > m2 > m3 > mn] -> response [Client]

const middlware = [ m1, m2, m3 ];
