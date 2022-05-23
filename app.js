const express = require('express');
var cookies = require("cookie-parser");
var app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('control');
const mongoose = require('mongoose');

app.use(cookies());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.use('/', express.static(__dirname + '/static'));


app.listen(1275, () => {
    console.log("Connected at ", "http://127.0.0.1:1275");
})