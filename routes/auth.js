const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../controller/control');

router.post('/login', urlencodedParser, authController.login);
router.post('/adminLogin', urlencodedParser, authController.adminLogin);
// router.get('/input/:br/copo', urlencodedParser, authController.input);
router.get('/profile', authController.isLogIn, authController.renderProfile);
router.get('/signout', authController.signout);
router.post('/selectBranch', authController.isLogIn, authController.selectBranch);
// router.post('/profileupdate', urlencodedParser, authController.profileUpdate)
module.exports = router;