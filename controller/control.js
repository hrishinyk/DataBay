const Login = require("../Schemas/login");
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const util = require('util');
// const json = require("json");
// const { profile } = require('console');
// const { hasSubscribers } = require('diagnostics_channel');
// const { lookup } = require('dns');
// const { accepts } = require('express/lib/request');
// const { query } = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin123@databay.tv5wy.mongodb.net/test", {
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
    res.status(200).render('login.html');
    const { email, password } = req.body; //The req. body object allows you to access data in a string or JSON object from the client side
    Login.findOne({ email: email }, (err, login) => {
        if (login) {
            if (password === login.password) {
                login.password = null;
                res.send({ message: "Login Succesful", Loginuser: login }); //an object with members message of alert and user with user info for going to specific user page
            } else {
                res.send({ message: "Wrong Credentials" });
            }
        } else {
            res.send({ message: "Sorry! You have not registered" });
            console.log(err);
        }
    });
}

// app.post("/Login", (req, res) => {
//     const { email, password } = req.body; //The req. body object allows you to access data in a string or JSON object from the client side
//     Login.findOne({ email: email }, (err, login) => {
//         if (login) {
//             if (password === login.password) {
//                 login.password = null;
//                 res.send({ message: "Login Succesful", Loginuser: login }); //an object with members message of alert and user with user info for going to specific user page
//             } else {
//                 res.send({ message: "Wrong Credentials" });
//             }
//         } else {
//             res.send({ message: "Sorry! You have not registered" });
//             console.log(err);
//         }
//     });
// })