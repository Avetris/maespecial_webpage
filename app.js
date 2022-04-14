var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var admin = require('./api/admin');
const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/data', express.static('./blog_images'));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', admin);

module.exports = app;