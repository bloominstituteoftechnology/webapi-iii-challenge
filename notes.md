what is middleware def from Redux?
intercepts data and does things for you and useful, part of async operations  

Middleware notes

Client - request - [-> Server]

Inside the Server...

request -[-> m1 > m2 > m3 > mn] -> response [Client]

const middlware = [ m1, m2, m3 ];

request -[-> m1 > m2 > E1 < m3 > E2 > mn > E ]-> response -> [client]

application can be in two modes:

- no error mode 
- error mode


Common Patterns
- MVC = Model View Controller 
- MVP = Model View Presenter 


Model deals with data. 
View deals with the UI. 
Controller deals with user input/response.

The UI for a Web API is the set of endpoints published by it.

MRC = Model Route Controller

Client --> Routes > Controller > Model > data store

"Clever code is a code smell"


axios
    .put(`http://theapi.com/${editedNote.id}`, editedNote)
    .then(res => {
        console.log(res.data);
    };


    editedNote.id comes in as:
```req.params.id```


editedNote comes in as:
```req.body```


`res.json({ notes })` sends all the notes out as:
```res.data```
