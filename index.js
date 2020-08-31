// import express from 'express' // ES2015 modules
const express = require('express'); //commonJS modules

const server = express(); // gives a server

server.use(express.json()); /* invoke the method, this is needed for post and put
otherwise express can't read request data - this is middleware */

server.get('/', (req, res) => { // request handler function, res is given by express
    res.status(200).json({welcome: 'to the api'}); // res object allows us to produce the response
});

// list users

let users = [
    {
        id: 1,
        name: 'John Smith',
        bio: 'A person'
    },
]

server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json({ data: users});
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }

});

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!users) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else if (!users.find(user => user.id === id)) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(200).json({data: users.find(user => user.id === id)})
    }
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (!newUser) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
    else if (newUser.name && newUser.bio) {
        users.push(newUser);
        res.status(201).json({ data: newUser });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!users) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    } else if (!users.find(user => user.id === id)) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        users = users.filter(user => user.id !== id);
        res.status(200).json({ data: users })
    }
    // all values coming from the URL are strings, so we use the Number constructor

})

server.put('/api/users/:id', (req, res) => {
    const changes = req.body;
    const id = Number(req.params.id);
    let found = users.find(user => user.id === id);

    if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!changes.name | !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Object.assign(found, changes)
            .then(res.status(200).json(found))
            .catch(res.status(500).json({ errorMessage: "The user information could not be modified." }))
    }

})

const port = 8000;
server.listen(port, () => console.log('server up'));
