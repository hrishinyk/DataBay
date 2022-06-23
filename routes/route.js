const express = require('express');
const authController = require('../controller/control');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    // res.status(200);
    // res.render(path.join(__dirname, '../views/login.ejs'));
    // let deadlines = {
    //     Notification1: "Notification1",
    //     Notification2: "Notification2",
    //     Notification3: "Notification3",
    // }
    // res.cookie("deadlines", deadlines, { expires: new Date(253402300000000) });
    // res.send("Done");
    res.status(200).render(path.join(__dirname, '../views/1.Login-Faculty.ejs'));
});

router.get('/adminLogin', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/11.Login-Admin.ejs'));
})

router.get('/FacultyLogin', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/1.Login-Faculty.ejs'));
})

router.get('/branch', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/3.branch.ejs'));
})

router.get('/faq', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/7.faq.ejs'))
})

// router.get('/index', (req, res) => {
//     // u = { Notification1: req.cookie.deadlines.Notification1, Notification2: req.cookie.deadlines.Notification1, Notification3: req.cookie.deadlines.Notification1 };
//     // console.log(req.cookie);
//     let deadlines = {
//         Notification1: "Notification1",
//         Notification2: "Notification2",
//         Notification3: "Notification3",
//     }
//     res.status(200).render(path.join(__dirname, '../views/2.index'), { user: deadlines });
// })

router.get('/about', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/6.about.ejs'))
})

router.get('/chatbox', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/15.Chatbox.ejs'))
})

// router.get('/adminHome', (req, res) => {
//     res.status(200).render(path.join(__dirname, '../views/12.Home.ejs'))
// })

router.get('/adminfaq', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/13.FAQ-Admin.ejs'))
})

router.get('/deadlines', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/16.Deadline.ejs'))
})

router.get('/adminabout', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/14.About-Admin.ejs'))
})

router.get('/createAcc', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/17.CreateAccount.ejs'))
})

router.get('/adminchat', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/15.Chatbox.ejs'))
})

// router.get('/profile', (req, res) => {
//     res.status(200).render(path.join(__dirname, '../views/8.profileedit.ejs'))
// })

router.get('/forgotpass', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/9.ForgotPass.ejs'))
})

// router.get('/docs', (req, res) => {
//     // res.send(req.cookies);
//     res.status(200).render(path.join(__dirname, '../views/4.check.ejs'))
// })

router.get('/upload', (req, res) => {
    res.status(200).render(path.join(__dirname, '../views/5.Upload.ejs'))
})

// router.get('/input/:id/', (req, res) => {
//     res.status(200).render(path.join(__dirname, '../views/4.check.ejs'))
// })

module.exports = router;