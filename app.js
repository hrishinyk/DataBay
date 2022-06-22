const express = require('express');
var cookies = require("cookie-parser");
var app = express();
const ejs = require('ejs');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('./controller/control');
const path = require('path')
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: config.mongoURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             // encrypt filename before storing it
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });
// const upload = multer({ storage });


app.use(cookies());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/route'));

app.listen(1275, () => {
    console.log("Connected at ", "http://127.0.0.1:1275");
})