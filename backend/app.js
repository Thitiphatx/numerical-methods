const express = require('express');
const mysql = require('mysql');

const app = express();
const testData = [
    {
        x: 0,
        y: 0,
        z: 1,
    },
    {
        x: 3,
        y: 2,
        z: 1,
    },
    {
        x: 5,
        y: 1,
        z: 4,
    },
    {
        x: 2,
        y: 7,
        z: 343,
    }
]


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res)=> {
    res.send(testData);
})

app.listen(3001, ()=> {
    console.log("Server started")
})