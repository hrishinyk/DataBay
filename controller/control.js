// const LoginModel = require("../Schemas/login");
// const DeadlinesModel = require("../Schemas/deadlines");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const json = require("json");
const methodOverride = require('method-override');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const fs = require('fs');
const Grid = require('gridfs-stream');
// import { createReadStream } from 'fs';
const mongoose_gridfs = require('mongoose-gridfs');
// import { createModel } from 'mongoose-gridfs';
var crypto = require('crypto');

const mongoose = require('mongoose');
const path = require('path');
const deadlines = require("../Schemas/deadlines");
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     autoIndex: true,
// });
var url = "mongodb+srv://admin:mypassword@databay.tv5wy.mongodb.net/DataBay?retryWrites=true&w=majority";
const conn = mongoose.createConnection(url);
// const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error: "));
conn.once("open", () => {
    console.log("Connected to database successfully");
});

// global.notification = {};
// global.u = {};

const LoginModel = conn.model('LoginModel', require('../schemas/login'));
const DeadlinesModel = conn.model('DeadlinesModel', require('../schemas/deadlines'));
const UploadModel = conn.model('UploadModel', require('../schemas/uploads'));
// let gfs;

let gfs, gridfsBucket;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "uploads"
// });
// console.log(bucket);

// Create storage engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
                metadata: req.cookies.uploadData,
            };
            resolve(fileInfo);
        });
    }
});
const upload = multer({ storage });

module.exports.upload = upload;


module.exports.login = (req, res) => {
    // console.log("C");
    email1 = req.body.email;
    password = req.body.password;
    // console.log(email1);

    LoginModel.find({
            email: email1
        })
        .then(doc => {
            // console.log(doc);
            if (doc.length > 0) {
                // console.log(doc[0].name);
                var pass = doc[0].password;
                if (pass == password && doc[0].isAdmin == "false") {
                    // res.render(path.join(__dirname, '../views/index.ejs'));
                    var token = jwt.sign({ email: doc[0].email }, 'mysecretpassword', { expiresIn: '90d' });

                    var cookieoption = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieoption).redirect('/auth/profile');
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
                    res.cookie('owner', token, cookieoption).redirect('/auth/adminHome');
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
        u = {
            Fname: req.data.Fname,
            Lname: req.data.Lname,
            secretKey: req.data.secretKey,
            email: req.data.email,
        };
        res.status(200).render(path.join(__dirname, '../views/8.profileedit.ejs'), { user: u });
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

module.exports.editProfile = (req, res) => {
    u = {
        Fname: req.data.Fname,
        Lname: req.data.Lname,
        secretKey: req.data.secretKey,
        email: req.data.email,
    };
    res.status(200).render(path.join(__dirname, '../views/8.profileedit.ejs'), { user: u });
}

module.exports.selectBranch = (req, res) => {
    // req.data.branch = req.body.Branch;
    // console.log("Changed cookie");
    let upload = {
        branch: req.body.Branch,
        semester: req.body.Semester
    }
    res.cookie("uploadData", upload);
    res.redirect('/auth/docs');
    // res.status(200).render(path.join(__dirname, '../views/4.check.ejs'));
}

module.exports.getData = (req, res) => {
    // res.json({ file: req.file });
    // console.log(req.cookies.uploadData.branch);
    // console.log(req.file.filename)

    DeadlinesModel.find({
            type: "deadlines"
        })
        .then(doc => {
            // console.log(doc);
            notification = {
                    Notification1: doc[0].Notification1,
                    Notification2: doc[0].Notification2,
                    Notification3: doc[0].Notification3,
                }
                // res.status(200).render(path.join(__dirname, '../views/2.index.ejs'), { user: u });
        })


    var query = { branch: req.cookies.uploadData.branch, semester: req.cookies.uploadData.semester, filename: req.file.filename },
        update = { isUpdated: "true" },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    UploadModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (!error) {
            // If the document doesn't exist
            if (!result) {
                // Create it
                result = new UploadModel();
            }
            // Save the document
            result.save(function(error) {
                if (!error) {
                    u = {
                        isUpdated: result.isUpdated,
                        filename: req.file.filename,
                    }
                    res.status(200).render(path.join(__dirname, '../views/4.check.ejs'), { check: u, user: notification });
                } else {
                    throw error;
                }
            });
        }
    });
}

module.exports.setDeadlines = (req, res) => {
    const query = { type: "deadlines" };
    DeadlinesModel.findOneAndUpdate(query, { Notification1: req.body.t1, Notification2: req.body.t2, Notification3: req.body.t3 }, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });
        res.redirect('/adminHome');
        // return res.send('Succesfully saved.');
    });
}

module.exports.printHomeDeadlines = (req, res) => {
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

module.exports.printCheckDeadlines = (req, res) => {
    // console.log(req.cookies);
    // let notification, u;
    // var temp1 = {},
    //     temp2 = {};
    DeadlinesModel.find({
            type: "deadlines"
        })
        .then(doc => {
            // console.log(doc);
            notification = {
                Notification1: doc[0].Notification1,
                Notification2: doc[0].Notification2,
                Notification3: doc[0].Notification3,
            }
            UploadModel.find({
                    branch: req.cookies.uploadData.branch,
                    semester: req.cookies.uploadData.semester,
                })
                .then(doc => {
                    if (doc.length == 0 || doc == undefined) {
                        // console.log("here");
                        u = {
                            isUpdated: "false",
                            filename: ""
                        }
                        res.status(200).render(path.join(__dirname, '../views/4.check.ejs'), { user: notification, check: u });
                    }
                    // console.log(doc);
                    else {
                        u = {
                            isUpdated: doc[0].isUpdated,
                            filename: doc[0].filename,
                        }
                        res.status(200).render(path.join(__dirname, '../views/4.check.ejs'), { user: notification, check: u });
                    }
                })
        })

    // console.log(temp1);
    // console.log(temp2);
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

module.exports.changeDetails = (req, res) => {
    const query = { email: req.data.email };
    LoginModel.findOneAndUpdate(query, {
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        secretKey: req.body.secretKey,
        isUpdated: "true"
    }, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });
        res.redirect('/auth/index');
        // return res.send('Succesfully saved.');
    });
}

module.exports.retrieve = (req, res) => {
    // console.log(req.body);

    // console.log("here");
    gfs.files.findOne({
        filename: req.body.Doc
    }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).send("error");
        }

        if (file.contentType === 'application/pdf') {
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
            // const readStream = gfs.createReadStream(file.filename);
            // readStream.pipe(res);
        } else {
            res.status(404).send("Error")
        }
    })
}

module.exports.activeUsers = (req, res) => {
    LoginModel.find({
            loggedIn: "false",
            // isAdmin: "false"
        })
        .then(doc => {
            u = doc;
            res.status(200).render(path.join(__dirname, '../views/12.Home.ejs'), { user: u });
            // console.log(doc);
        })
}