const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const hoffman = require('hoffman')
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const schedule = require('node-schedule')
const ip = require('ip')

const monitor = require('./monitor.js')
monitor.logload();

const formular = require('./formular.js')
const mailer = require("./mailer.js")

app.use(function(req, res, next){
  console.log(req.method + ":" + req.url)
  next()
})

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
})

var ipadress = ip.address();
var ser = app.listen(3000, "127.0.0.1",
    () => {
      console.log("==========================================================")
      console.log("Server running from " + ipadress + " on port " + "3000")
      console.log("==========================================================")
    })

schedule.scheduleJob('0 0 * * *', () => {
  monitor.logwrite
}) // run everyday at midnight (NOT TESTED)

// catch ctrl+c event, call logwrite(1) function before quitting
process.on('SIGINT', function () {
  monitor.logwrite(1)
})

//catch uncaught exceptions, call logwrite function before quitting
/*process.on('uncaughtException', function(e) {
  process.stdin.resume();
  logwrite(todayDate, todayLog)
})

Event management with sockets.io
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !')
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message)
    })
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !')
})*/
