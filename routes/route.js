const express = require('express');
const authController = require('../controller/control');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.status(200);
    res.render(path.join(__dirname, '../views/login.ejs'));
});

router.get('/branch', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/branch.html'));
})

router.get('/faq', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/faq.html'))
})

router.get('/profile', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/input', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/check.html'))
})

module.exports = router;