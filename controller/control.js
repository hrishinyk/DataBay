//const Login = require("../Schemas/login");
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const util = require('util');
// const json = require("json");
//express = require('express');
// const app = express();
const mysql = require('mysql');
const { emit } = require('nodemon');
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
// const mongoose = require('mongoose');
const path = require('path')
    // var popup = require('popups');
    //     // const mongoose = require('mongoose');
    // var url = "mongodb://localhost:27017/DataBay";
    // mongoose.connect(url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     autoIndex: true,
    // });
    // const db = mongoose.connection;
    // db.on("error", console.error.bind(console, "connection error: "));
    // db.once("open", function() {
    //     console.log("Connected to database successfully");
    // });

let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'databay'
});
db.connect(() => {
    console.log("Connected");
    console.log("Waiting");
});

module.exports.login = (req, res) => {
    //console.log("C")
    email = req.body.email;
    password = req.body.password;

    sql = "select * from login where email = ?";
    db.query(sql, [email], (err, result) => {

        if (result.length > 0) {
            var pass = result[0].password;
            if (pass == password) {
                res.sendFile(path.join(__dirname, '../views/index.html'));
            }
        } else {
            // res.sendFile(path.join(__dirname, '../views/404.html'));
            //alert("Incorrect Credentials");
            res.sendFile(path.join(__dirname, '../views/404.html'));
        }
        if (err) {
            console.log(err);
        }
    })
}