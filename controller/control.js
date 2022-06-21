const LoginModel = require("../Schemas/login");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const json = require("json");
// express = require('express');
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
    // console.log("C");
    email1 = req.body.email;
    password = req.body.password;
    // console.log(email1);

    LoginModel.find({
            email: email1
        })
        .then(doc => {
            if (doc.length > 0) {
                // console.log(doc);
                // console.log(doc[0].name);
                var pass = doc[0].password;
                if (pass == password && doc[0].isAdmin == "false") {
                    // res.sendFile(path.join(__dirname, '../views/index.html'));
                    var token = jwt.sign({ email: doc[0].email }, 'mysecretpassword', { expiresIn: '90d' });

                    var cookieoption = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieoption).redirect('profile');
                } else {
                    res.sendFile(path.join(__dirname, '../views/404-F.html'));
                    // res.render('index', { message: 'Incorrect Credentials', color: '<div class="alert alert-danger" role="alert">' });
                    // }
                    // if (doc[0].isupdated == "false") {
                    //     // res.redirect('profile');
                    //     res.sendFile(path.join(__dirname, '../views/profile.html'))
                    // } else {
                    //     res.sendFile(path.join(__dirname, '../views/index.html'));
                    // }
                }
            } else {
                res.sendFile(path.join(__dirname, '../views/404-F.html'));
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.isLogIn = async(req, res, next) => {
    if (typeof(req.cookies.jwt) != 'undefined') {
        try {
            token = req.cookies.jwt;
            // console.log(token);
            var decoded = await util.promisify(jwt.verify)(token, 'mysecretpassword');
            LoginModel.find({
                    email: decoded.email
                })
                .then(doc => {
                    if (doc.length > 0) {
                        req.data = doc[0];
                        return next();
                    } else {
                        return next();
                    }
                })
                // sql = 'select * from users_details where id = ?';
                // db.query(sql, [decoded.id], (err, result) => {
                //     if (result.length > 0) {
                //         req.data = result[0];
                //         return next();
                //     } else {
                //         return next();
                //     }
                // })
        } catch (err) {
            // err
            if (err) {
                console.log(err)
            }
            return next();
        }
    } else {
        req.notPresent = true;
        return next();
    }
}

module.exports.adminLogin = (req, res) => {
    // console.log("C");
    email1 = req.body.email;
    password = req.body.password;
    // console.log(email1);

    LoginModel.find({
            email: email1
        })
        .then(doc => {
            if (doc.length > 0) {
                // console.log(doc);
                // console.log(doc[0].name);
                var pass = doc[0].password;
                if (pass == password && doc[0].isAdmin == "true") {
                    // res.sendFile(path.join(__dirname, '../views/index.html'));
                    var token = jwt.sign({ id: doc[0].email }, 'mysecretpassword', { expiresIn: '90d' });

                    var cookieoption = {
                            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        // console.log("Logged in");
                    res.cookie('owner', token, cookieoption).redirect('/adminHome');
                } else {
                    res.sendFile(path.join(__dirname, '../views/404-A.html'));
                    // res.render('index', { message: 'Incorrect Credentials', color: '<div class="alert alert-danger" role="alert">' });
                    // }
                    // if (doc[0].isupdated == "false") {
                    //     // res.redirect('profile');
                    //     res.sendFile(path.join(__dirname, '../views/profile.html'))
                    // } else {
                    //     res.sendFile(path.join(__dirname, '../views/index.html'));
                    // }
                }
            } else {
                res.sendFile(path.join(__dirname, '../views/404-A.html'));
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.signout = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.redirect('/');
}

module.exports.renderProfile = (req, res) => {
    // console.log(req.data.isAdmin);
    if (req.data.isUpdated == "false") {
        res.status(200).sendFile(path.join(__dirname, '../views/8.profileedit.html'));
    } else {
        res.status(200).sendFile(path.join(__dirname, '../views/2.index.html'));
    }
}

module.exports.selectBranch = (req, res) => {
    console.log(req.data);
    console.log(req.body);
}