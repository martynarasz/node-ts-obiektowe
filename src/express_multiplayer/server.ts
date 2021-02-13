import {User} from "./_model/user";

const express = require('express');
const app = express();

const port = 3001;

app.s = [];

app.get('/', async (req, res) => {
    res.send({"comment": 'App works ok!'});
});

app.get('/users', async (req, res) => {
    let u = new User('kadabra', 112);
    res.send(u);
});

app.get('/greet', async (req, res) => {
    console.log('/greet path called');
    res.send({"comment": "hi there!"});
});



console.log(`Starting app; try: http://localhost:${port}/users`);

// let x = {"comment":"App works ok!"}
// console.log(x['comment'])


app.listen(port, '0.0.0.0');
app.get('/users/create', async (req, res) => {
    let newUserName = req.query.name;
    let pinString = req.query.pin;
    console.log(`Creating user ${newUserName}`);
    let u = new User(newUserName, pinString);
    res.send(u);
});