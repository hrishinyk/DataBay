const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../controller/control');
const methodOverride = require('method-override');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const fs = require('fs');
const Grid = require('gridfs-stream');
var crypto = require('crypto');

const upload = authController.upload;

router.post('/login', urlencodedParser, authController.login);
router.post('/adminLogin', urlencodedParser, authController.adminLogin);
router.post('/forgotpassword', urlencodedParser, authController.forgotPassword);
router.get('/profile', authController.isLogIn, authController.renderProfile);
router.get('/signout', authController.signout);
router.post('/selectBranch', authController.isLogIn, authController.selectBranch);
router.post('/setDeadlines', urlencodedParser, authController.setDeadlines);
router.get('/index', authController.isLogIn, authController.printHomeDeadlines);
router.post('/createAcc', urlencodedParser, authController.createAcc);
router.get('/editProfile', authController.isLogIn, authController.editProfile);
router.post('/changeDetails', urlencodedParser, authController.isLogIn, authController.changeDetails);
router.get('/docs', authController.isLogIn, authController.printCheckDeadlines);
router.post('/mapToFaculty', urlencodedParser, authController.mapToFaculty);
// router.get('/docs', (req, res) => {
//     res.send(req.cookies.uploadData);
// })
router.get('/adminHome', authController.activeUsers);
router.post('/getData', upload.single('file'), authController.getData);
// router.post('/getData', upload.single('file'), (req, res) => {
//     res.json({ file: req.file });
//     // res.redirect('/');
// });

router.post('/retrieve', urlencodedParser, authController.retrieve);


// router.get('/input/:br/copo', urlencodedParser, authController.input);
// router.post('/profileupdate', urlencodedParser, authController.profileUpdate)
module.exports = router;