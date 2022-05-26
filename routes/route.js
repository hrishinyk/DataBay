const express = require('express');
const authController = require('../controller/control');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).render('login');
});



module.exports = router;