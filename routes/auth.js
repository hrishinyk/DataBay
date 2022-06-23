const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../controller/control');

router.post('/login', urlencodedParser, authController.login);
router.post('/adminLogin', urlencodedParser, authController.adminLogin);
router.post('/forgotpassword', urlencodedParser, authController.forgotPassword);
router.get('/profile', authController.isLogIn, authController.renderProfile);
router.get('/signout', authController.signout);
router.post('/selectBranch', authController.isLogIn, authController.selectBranch);
router.post('/getData', urlencodedParser, authController.isLogIn, authController.getData);
router.post('/setDeadlines', urlencodedParser, authController.setDeadlines);
router.get('/index', authController.isLogIn, authController.printHomeDeadlines);
router.post('/createAcc', urlencodedParser, authController.createAcc);
router.get('/editProfile', authController.isLogIn, authController.editProfile);
router.post('/changeDetails', urlencodedParser, authController.isLogIn, authController.changeDetails);
router.get('/docs', authController.isLogIn, authController.printCheckDeadlines);

router.get('/adminHome', authController.activeUsers);

// router.get('/input/:br/copo', urlencodedParser, authController.input);
// router.post('/profileupdate', urlencodedParser, authController.profileUpdate)
module.exports = router;