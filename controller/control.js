const LoginModel = require("../Schemas/login");
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const util = require('util');
// const json = require("json");
//express = require('express');
// const app = express();
// const mysql = require('mysql');
const { emit } = require('nodemon');
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
const mongoose = require('mongoose');
const path = require('path')
var url = "mongodb+srv://admin:mypassword@databay.tv5wy.mongodb.net/DataBay?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected to database successfully");
});

module.exports.login = (req, res) => {
    console.log("C");
    email1 = req.body.email;
    password = req.body.password;
    // console.log(email1);

    LoginModel.find({
            email: email1
        })
        .then(doc => {
            if (doc.length > 0) {
                var pass = doc[0].password;
                if (pass == password) {
                    res.sendFile(path.join(__dirname, '../views/index.html'));
                }
            } else {
                res.sendFile(path.join(__dirname, '../views/404.html'));
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.inputcs = (req, res) => {
    console.log("C");
}