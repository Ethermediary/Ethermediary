const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
const hoffman = require('hoffman');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const formular = require('./formular.js');
const mailer = require("./mailer.js");
const ip = require('ip');


app.use(function(req, res, next){
  console.log(req.method + ":" + req.url);
  next();
});

// Set path ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
doCache = false;
app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.png")));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieParser());
app.engine('dust', hoffman.__express());
//set the view engine to dust
app.set('view engine', 'dust');
//indicate to express where the views directory is
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', doCache);
app.enable('trust proxy');

// mailer.sendMail("plenituz@gmail.com", "salut", "Bonjour je suis un bonhomme")
// .then(rep => {
//   console.log("rep:", rep);
// })
// .catch(err => {
//   console.log("err:", err);
// })


app.use(formular);

app.get('/', function (req, res) {
  res.render('skeleton.dust', {req : req});
});

var ipadress = ip.address();
var ser = app.listen(3000, "127.0.0.1",
    function () {
        console.log("Server running from " + ipadress + " on port " + "3000");
});