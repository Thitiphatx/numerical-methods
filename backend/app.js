const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'numer_db'
})

db.connect((err) => {
    if (err) {
        console.log('Error failed to connect to database', err);
        return
    }
    console.log('Database conntected');
})

app.get(`/getHistory/graphical`, (req, res)=> {
    db.query(`SELECT * FROM inputs WHERE input_method = 'graphical'`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.listen(3001, ()=> {
    console.log("Server started")
})