const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const hoffman = require('hoffman')
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const ip = require('ip')
const monitor = require('./monitor.js')
const formular = require('./formular.js')
const mailer = require("./mailer.js")

// app.use(function(req, res, next){
//   console.log(req.method + ":" + req.url)
//   next()
// })

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

app.use(formular);

app.get('/', function (req, res) {
  res.render('skeleton.dust', {req : req});
})

monitor.loadLog();
monitor.startScheduledSaving();

var ser = app.listen(3000, "127.0.0.1",
    () => {
      console.log("==========================================================")
      console.log("Server running from " + ip.address() + " on port 3000")
      console.log("==========================================================")
    })