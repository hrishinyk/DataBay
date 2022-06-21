const express = require('express');
const authController = require('../controller/control');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    // res.status(200);
    // res.render(path.join(__dirname, '../views/login.ejs'));
    res.status(200).sendFile(path.join(__dirname, '../views/1.Login-Faculty.html'));
});

router.get('/adminLogin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/11.Login-Admin.html'));
})

router.get('/FacultyLogin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/1.Login-Faculty.html'));
})

router.get('/branch', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/3.branch.html'));
})

router.get('/faq', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/7.faq.html'))
})

router.get('/index', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/2.index.html'))
})

router.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/6.about.html'))
})

router.get('/chatbox', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/15.Chatbox.html'))
})

router.get('/adminHome', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/12.Home.html'))
})

router.get('/adminfaq', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/13.FAQ-Admin.html'))
})

router.get('/deadlines', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/16.Deadline.html'))
})

router.get('/adminabout', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/14.About-Admin.html'))
})

router.get('/createAcc', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/17.CreateAccount.html'))
})

router.get('/adminchat', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/15.Chatbox.html'))
})

router.get('/profile', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/8.profileedit.html'))
})

// router.get('/input/:id/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../views/4.check.html'))
// })

module.exports = router;