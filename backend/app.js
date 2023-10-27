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

app.get(`/getHistory/:method`, (req, res)=> {
    const { method } = req.params;
    db.query("SELECT * FROM inputs WHERE input_method = ?", [method], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.post('/addHistory', (req, res) => {
    const ip_method = req.body.ip_method;
    const ip_json = req.body.ip_json;

    db.query("INSERT INTO inputs (input_method, input_json) VALUES(?,?)", [ip_method, ip_json], (err, result)=> {
        if (err) {
            console.log(err);
        }
    })
})

app.delete('/delete/:id', (req, res)=> {
    const id = req.params.id;
    db.query("DELETE FROM inputs WHERE input_id = ?", id, (err, result)=> {
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