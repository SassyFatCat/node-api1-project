// import express from 'express' // ES2015 modules
const express = require('express'); //commonJS modules

const server = express(); // gives a server

server.use(express.json()); /* invoke the method, this is needed for post and put
otherwise express can't read request data - this is middleware */

server.get('/', (req, res) => { // request handler function, res is given by express
    res.status(200).json({hello: 'Node 33'}); // res object allows us to produce the response
});

// list  hubs

let hubs = [
    {
        id: 1,
        name: 'node intro',
        lessonID: 1,
        cohort: 'node33'
    },
    {
        id: 2,
        name: 'node routing',
        lessonID: 2,
        cohort: 'node33'
    },
]

server.get('/hubs', (req, res) => {
    res.status(200).json({ data: hubs})
});

server.post('/hubs', (req, res) => {
    const hub = req.body;
    hubs.push(hub);

    res.status(201).json({ data: hubs })
});

server.delete('/hubs/:id', (req, res) => {
    const id = Number(req.params.id);

    // all values coming from the URL are strings, so we use the Number constructor
    hubs = hubs.filter(hub => hub.id !== id);
    res.status(200).json(hubs); // .end() sends a success message, and ends the response without sending anything
})

server.put('/hubs/:id', (req, res) => {
    const changes = req.body;
    const id = Number(req.params.id);

    let found = hubs.find(hub => hub.id === id);

    if(found) {
        Object.assign(found, changes); 
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'not found' });
    }
})

const port = 8000;
server.listen(port, () => console.log('server up'));
