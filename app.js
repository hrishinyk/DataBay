const express = require('express');
var cookies = require("cookie-parser");
var app = express();
const ejs = require('ejs');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('./controller/control');
const path = require('path')

app.use(cookies());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/route'));

app.listen(1275, () => {
    console.log("Connected at ", "http://127.0.0.1:1275");
})