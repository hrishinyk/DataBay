const LoginModel = require("../Schemas/login");
const DeadlinesModel = require("../Schemas/deadlines");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const json = require("json");
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// express = require('express');
// const app = express();
// const mysql = require('mysql');
const { emit } = require('nodemon');
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
const mongoose = require('mongoose');
const path = require('path');
const deadlines = require("../Schemas/deadlines");
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

// let gfs;
// db.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(db.db, {
//         bucketName: "uploads"
//     });
// });

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
                    // res.render(path.join(__dirname, '../views/index.ejs'));
                    var token = jwt.sign({ email: doc[0].email }, 'mysecretpassword', { expiresIn: '90d' });

                    var cookieoption = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieoption).redirect('profile');
                } else {
                    res.render(path.join(__dirname, '../views/404-F.ejs'));
                    // res.render('index', { message: 'Incorrect Credentials', color: '<div class="alert alert-danger" role="alert">' });
                    // }
                    // if (doc[0].isupdated == "false") {
                    //     // res.redirect('profile');
                    //     res.render(path.join(__dirname, '../views/profile.ejs'))
                    // } else {
                    //     res.render(path.join(__dirname, '../views/index.ejs'));
                    // }
                }
            } else {
                res.render(path.join(__dirname, '../views/404-F.ejs'));
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
                        req.data.branch = "";
                        req.data.sem = "";
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
    // console.log(req.body);
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
                    // res.render(path.join(__dirname, '../views/index.ejs'));
                    var token = jwt.sign({ id: doc[0].email }, 'mysecretpassword', { expiresIn: '90d' });

                    var cookieoption = {
                            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        // console.log("Logged in");
                    res.cookie('owner', token, cookieoption).redirect('/adminHome');
                } else {
                    res.render(path.join(__dirname, '../views/404-A.ejs'));
                    // res.render('index', { message: 'Incorrect Credentials', color: '<div class="alert alert-danger" role="alert">' });
                    // }
                    // if (doc[0].isupdated == "false") {
                    //     // res.redirect('profile');
                    //     res.render(path.join(__dirname, '../views/profile.ejs'))
                    // } else {
                    //     res.render(path.join(__dirname, '../views/index.ejs'));
                    // }
                }
            } else {
                res.render(path.join(__dirname, '../views/404-A.ejs'));
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

module.exports.forgotPassword = (req, res) => {
    LoginModel.find({
            email: req.body.email
        })
        .then(doc => {
            if (doc[0].secretKey == req.body.secretKey) {
                if (req.body.password == req.body.confirmPass) {
                    const query = { email: req.body.email };
                    LoginModel.findOneAndUpdate(query, { password: req.body.password }, { upsert: true }, function(err, doc) {
                        if (err) return res.send(500, { error: err });
                        res.redirect('/');
                        // return res.send('Succesfully saved.');
                    });
                }
            }
        })
}

module.exports.renderProfile = (req, res) => {

    // let deadlines = {
    //     Notification1: "Notification1",
    //     Notification2: "Notification2",
    //     Notification3: "Notification3",
    // }
    // res.cookie("deadlines", deadlines, { maxAge: 900000, httpOnly: false });

    // console.log(req.data.isAdmin);
    if (req.data.isUpdated == "false") {
        res.status(200).render(path.join(__dirname, '../views/8.profileedit.ejs'));
    } else {
        // console.log(req.cookie.deadlines);
        // u = { Notification1: "Hello" };
        // u = { Notification1: res.cookie.deadlines.Notification1, Notification2: res.cookie.deadlines.Notification1, Notification3: res.cookie.deadlines.Notification1 };
        // res.status(200).render(path.join(__dirname, '../views/2.index'), { user: u });
        DeadlinesModel.find({
                type: "deadlines"
            })
            .then(doc => {
                // console.log(doc);
                u = {
                    Notification1: doc[0].Notification1,
                    Notification2: doc[0].Notification2,
                    Notification3: doc[0].Notification3,
                }
                res.status(200).render(path.join(__dirname, '../views/2.index.ejs'), { user: u });
            })
            // res.status(200).render(path.join(__dirname, '../views/2.index.ejs'), { user: deadlines });
    }
}

module.exports.selectBranch = (req, res) => {
    // req.data.branch = req.body.Branch;
    // console.log("Changed cookie");
    let upload = {
        branch: req.body.Branch
    }
    res.cookie("uploadData", upload);
    res.redirect('/docs');
    // res.status(200).render(path.join(__dirname, '../views/4.check.ejs'));
}

module.exports.getData = (req, res) => {
    console.log(req.body);
}

module.exports.setDeadlines = (req, res) => {
    // var oldCookie = req.cookies.deadlines;
    // var newCookie = {
    //     Notification1: req.body.t1,
    //     Notification2: req.body.t2,
    //     Notification3: req.body.t3
    // }
    // if (oldCookie === undefined) {
    //     res.cookie('deadlines', newCookie);
    // } else if (oldCookie !== newCookie) {
    //     // The following line doesn't work.
    //     //res.cookie('lang', currentLang , { maxAge: 900000, httpOnly: false });
    //     // Neither this line updates the value.
    //     res.cookies.deadlines = newCookie;
    // }

    // let deadlines = {
    //     Notification1: req.body.t1,
    //     Notification2: req.body.t2,
    //     Notification3: req.body.t3
    // }
    // res.cookie("deadlines", deadlines);

    const query = { type: "deadlines" };
    DeadlinesModel.findOneAndUpdate(query, { Notification1: req.body.t1, Notification2: req.body.t2, Notification3: req.body.t3 }, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });
        res.redirect('/adminHome');
        // return res.send('Succesfully saved.');
    });
}

module.exports.printDeadlines = (req, res) => {
    DeadlinesModel.find({
            type: "deadlines"
        })
        .then(doc => {
            // console.log(doc);
            u = {
                Notification1: doc[0].Notification1,
                Notification2: doc[0].Notification2,
                Notification3: doc[0].Notification3,
            }
            res.status(200).render(path.join(__dirname, '../views/2.index.ejs'), { user: u });
        })
}

module.exports.createAcc = (req, res) => {
    // console.log(req.body);
    LoginModel.create({
        email: req.body.email,
        password: req.body.password,
        isUpdated: "false",
        name: "",
        phone: "",
        isAdmin: req.body.type,
        secretKey: ""
    });
    res.redirect('/adminHome');
}